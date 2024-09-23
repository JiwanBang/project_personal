import session, { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    cookie: Cookie;
    user: number;
    isLogined: boolean;
    nickName: string;
  }
}
