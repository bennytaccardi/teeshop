"use server";

import ActivityLogs from "@/entities/activiy-logs";
import { ActivityLogsActionEnum } from "@/entities/enum/action.enum";
import { upsertLogs } from "@/services/activity-logs-service";
import { currentUser, User } from "@clerk/nextjs/server";

export async function upsertActivityLogs(
  action: ActivityLogsActionEnum
): Promise<ActivityLogs[]> {
  const loggedUser = await currentUser();
  if (!loggedUser) {
    throw new Error("Operation not permitted");
  }
  return await upsertLogs(loggedUser.id, action);
}
