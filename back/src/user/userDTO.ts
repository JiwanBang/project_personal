export namespace UserDTO {
  export class registDTO {
    user_id: string;
    password: string;
    nickname: string;
    phone_num: string;
  }

  export class login {
    id: number;
    user_id: string;
    password: string;
  }
}
