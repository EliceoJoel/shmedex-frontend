export const validImageExtensions: string[] = ["jpg", "png", "jpeg", "svg", "webp"];

export enum ExpPage {
	FOR_YOU = "foryou",
	FOLLOWING = "following",
}

export const baseUrl = "http://localhost:8080";

export enum AuthRequestType {
	LOGIN,
	REGSITER,
}

export enum UserPostActions {
	ADD_POST_DAY,
	EDIT_POST_DAY,
	DELETE_POST_DAY,
	DELETE_POST
}