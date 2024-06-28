import {IUserDataStorage} from "../Interfaces/IUserDataStorage";
import {LocalUserDataStorage} from "../Implementations/LocalUserDataStorage";
import {SessionUserDataStorage} from "../Implementations/SessionUserDataStorage";

// export const dataStorage = new SessionUserDataStorage();
export const dataStorage: IUserDataStorage = new LocalUserDataStorage();
