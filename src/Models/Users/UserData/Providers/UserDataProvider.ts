import {IUserDataProvider} from "../Interfaces/IUserDataProvider";
import {LocalUserDataStorage} from "../Implementations/LocalUserDataStorage";
import {SessionUserDataStorage} from "../Implementations/SessionUserDataStorage";

// export const dataStorage = new SessionUserDataStorage();
export const userDataProvider: IUserDataProvider = new LocalUserDataStorage();
