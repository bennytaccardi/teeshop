"use server";

import { db } from "@/db/client";
import Activity from "@/entities/activity";
import ActivityLogs from "@/entities/activiy-logs";
import { ActivityLogsActionEnum } from "@/entities/enum/action.enum";

export async function upsertLogs(
  userId: string,
  action: ActivityLogsActionEnum
): Promise<ActivityLogs[]> {
  const existentActivityLogs = (
    await db.from("activity_logs").select().eq("uid", userId)
  ).data;

  let data: ActivityLogs[];
  if (existentActivityLogs) {
    data = (
      await db
        .from("activity_logs")
        .upsert({
          ...existentActivityLogs,
          uid: userId,
          activity: JSON.stringify(getProperActivity(action)),
        })
        .select()
    ).data as ActivityLogs[];
  } else {
    console.log("Hey");
    data = (
      await db
        .from("activity_logs")
        .insert({
          uid: userId,
          activity: JSON.stringify(getProperActivity(action)),
        })
        .select()
    ).data as ActivityLogs[];
  }

  console.log(data);
  return data as ActivityLogs[];
}

function getProperActivity(action: ActivityLogsActionEnum): Activity {
  switch (action) {
    case ActivityLogsActionEnum.COMPLETE_QUIZ:
      return {
        type: ActivityLogsActionEnum.COMPLETE_QUIZ,
        result: true,
      };
    default:
      return {
        type: ActivityLogsActionEnum.NOT_DEFINED,
        result: true,
      };
  }
}
