"use client";
import React, { useState } from "react";
import MeetingTypeCards from "./MeetingTypeCards";
import { useRouter } from "next/navigation";
import MeetingModel from "./MeetingModel";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const initialValue = {
  dateTime: new Date(),
  discription: "",
  link: "",
};

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "isNewMetting" | "isMeetingJoining" | "isMettingScheduling" | undefined
  >();

  const router = useRouter();
  const client = useStreamVideoClient();
  const { user } = useUser();
  const [value, setValue] = useState(initialValue);
  const [callDetail, setCallDetail] = useState<Call>();
  const { toast } = useToast();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetail?.id}`;

  const createMeeting = async () => {
    if (!client || !user) return;
    console.log(client, user, "hello");

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw Error("Failed to create call");

      const startAt =
        value.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const discription = value.discription || "instant meeting";

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            discription,
          },
        },
      });
      setCallDetail(call);

      if (!value.discription) {
        router.push(`/meeting/${call.id}`);
      }

      toast({
        title: "you are joined in a meeting",
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <MeetingTypeCards
        icon="/icons/add-personal.svg"
        title="New Meeting"
        discription="setup a new meeting"
        handelClick={() => setMeetingState("isNewMetting")}
        className="bg-[#FF742E]"
      />
      <MeetingTypeCards
        icon="/icons/join-meeting.svg"
        title="Join Meeting"
        discription="via invitation link"
        className="bg-blue-1"
        handelClick={() => setMeetingState("isMeetingJoining")}
      />
      <MeetingTypeCards
        icon="/icons/schedule.svg"
        title="Schedule Meeting"
        discription="Plan your meeting"
        className="bg-purple-1"
        handelClick={() => setMeetingState("isMettingScheduling")}
      />
      <MeetingTypeCards
        icon="/icons/recordings.svg"
        title="View Recordings"
        discription="Meeting Recordings"
        className="bg-yellow-1"
        handelClick={() => router.push("/recordings")}
      />

      {!callDetail ? (
        <MeetingModel
          isOpen={meetingState === "isMettingScheduling"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          className="text-center"
          buttonText="Start Meeting"
          handelClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Add a Description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) =>
                setValue({ ...value, discription: e.target.value })
              }
            />
          </div>
          <div className="flex w-full flex-col gap-2.5">
            <label className="text-base font-normal leading-[22.4px] text-sky-2">
              Select Date and Time
            </label>
            <ReactDatePicker
              selected={value.dateTime}
              onChange={(date) => setValue({ ...value, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-dark-3 p-2 focus:outline-none"
            />
          </div>
        </MeetingModel>
      ) : (
        <MeetingModel
          isOpen={meetingState === "isMettingScheduling"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created"
          className="text-center"
          image="/icons/checked.svg"
          handelClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Link Copied" });
          }}
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}

      <MeetingModel
        isOpen={meetingState === "isNewMetting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handelClick={createMeeting}
      />

      <MeetingModel
        isOpen={meetingState === "isMeetingJoining"}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handelClick={() => router.push(value.link)}
      >
        <Input
          placeholder="Meeting link"
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => setValue({ ...value, link: e.target.value })}
        />
      </MeetingModel>
    </section>
  );
};

export default MeetingTypeList;
