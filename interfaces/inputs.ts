export interface ISignIn {
	email: string;
	password: string;
}

export interface ISignUp {
	name: string;
	lastName: string;
	email: string;
	password: string;
	confirmPassword: string;
}

export interface IUserToRegister {
	name: string;
	lastname: string;
	email: string;
	password: string;
}

export interface NewPost {
	postDay: number;
	post: string;
	image: FileList;
}

export interface NewComment {
	comment: string;
}
