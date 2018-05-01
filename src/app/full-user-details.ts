import { User } from "./user";
import { Group } from "./group";

/**
 * Full information about the user, including personal information
 * and the groups  which contain user
 */
export class FullUserDetails {
    user: User;
    groups: Group[];
}
