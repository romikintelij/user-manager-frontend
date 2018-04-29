import { User } from "./user";
import { Group } from "./group";

/**
 * Полная информация о пользователе, включая персональную информацию
 * и группы в которых состоит этот пользователь
 */
export class FullUserDetails {
    user: User;
    groups: Group[];
}