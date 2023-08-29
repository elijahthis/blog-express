export interface IUser {
	ID: String;
	first_name: String;
	last_name: String;
	email: String;
	username: String;
	created_at: Date;
}

export interface IPost {
	ID: String;
	title: String;
	body: String;
	image?: String;
	video?: String;
	created_at: Date;
	modified_at: Date;
	creator: IUser;
}
