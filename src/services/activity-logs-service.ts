"use server";

import { db } from "@/db/client";
import Activity from "@/entities/activity";
import ActivityLogs from "@/entities/activiy-logs";
import { ActivityLogsActionEnum } from "@/entities/enum/action.enum";

export async function upsertLogs(
  userId: string,
  action: ActivityLogsActionEnum
): Promise<ActivityLogs[]> {
  const existentActivityLogs: ActivityLogs[] | null = (
    await db.from("activity_logs").select().eq("uid", userId)
  ).data;

  let data: ActivityLogs[];
  if (existentActivityLogs?.length === 1) {
    const activities: Activity[] = JSON.parse(
      existentActivityLogs[0].activity
    ) as Activity[];
    activities.push(getProperActivity(action));
    data = (
      await db
        .from("activity_logs")
        .update({
          activity: JSON.stringify(activities),
        })
        .eq("uid", userId)
        .select()
    ).data as ActivityLogs[];
  } else {
    data = (
      await db
        .from("activity_logs")
        .insert({
          uid: userId,
          activity: JSON.stringify([getProperActivity(action)]),
        })
        .select()
    ).data as ActivityLogs[];
  }
  return data as ActivityLogs[];
}

function getProperActivity(action: ActivityLogsActionEnum): Activity {
  switch (action) {
    case ActivityLogsActionEnum.COMPLETE_QUIZ:
      return {
        type: ActivityLogsActionEnum.COMPLETE_QUIZ,
        result: true,
        when: new Date(),
      };
    case ActivityLogsActionEnum.START_QUIZ:
      return {
        type: ActivityLogsActionEnum.START_QUIZ,
        result: true,
        when: new Date(),
      };
    case ActivityLogsActionEnum.PAY_TEE:
      return {
        type: ActivityLogsActionEnum.PAY_TEE,
        result: true,
        when: new Date(),
      };
    default:
      return {
        type: ActivityLogsActionEnum.NOT_DEFINED,
        result: true,
        when: new Date(),
      };
  }
}
