export interface IAddress {
    documentType?: "Phone Bill" | "Water Bill" | "Bank Statement";
    country?: string;
    city?: string;
    address1?: string;
    address2?: string;
    fileUploaded?: string;
  }
  
  export interface IUser extends Document {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "Admin_Team" | "Client";
    address: IAddress;
    phone: string;
    balance: number;
    useCash: boolean;
    isDeleted: boolean;

  
    correctPassword(candidatePassword: string, userPassword: string): Promise<boolean>;
  }