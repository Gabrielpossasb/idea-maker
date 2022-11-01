export type User = {
   email: string;
   isVerified: boolean;
}

export interface Projects {
   id: string,
   name: string,
   bgColor: string,
   title: string,
   description1: string,
   subTitle2: string,
   description2: string,
   subTitle3: string,
   description3: string,
   img1: string,
}

export interface UserData {
   userID: string;
   id:  string,
   user:  string,
   
   projects :[
      Projects
   ]
}

export interface dataType {
   name: string,
   title: string,
   description: string
}

