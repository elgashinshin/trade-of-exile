import { Status } from '../constants/status';

export type Notification = {
  id: string;
  item: string;
  price: string;
  stashTab: string;
  status: STATUS;
  position: {
    left: number;
    top: number;
  };
};
