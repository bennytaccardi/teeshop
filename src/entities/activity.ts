import { ActivityLogsActionEnum } from "./enum/action.enum";

export default interface Activity {
  type: ActivityLogsActionEnum;
  result: boolean;
  when: Date;
}
