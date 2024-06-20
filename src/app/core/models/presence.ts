import { Employee } from "./employee";
import { PresenceType } from "./presenceType";

export class Presence {
    presenceId?: number;
    employeeId?: number;
    checkIn?: string;
    checkOut?: string;
    presenceTypeId?: number;
    checkInCoordinates?: string;
    checkOutCoordinates?: string;
    checkInImages?: File[];
    checkOutImages?: File[];
    Employee?:Employee;
    PresenceType?:PresenceType;
}