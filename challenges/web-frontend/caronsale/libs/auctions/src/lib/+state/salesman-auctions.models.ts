/**
 * Interface for the 'SalesmanAuctions' data
 */
export interface SalesmanAuctionsEntity {
  id: number | string; // Primary ID
}

export interface SalesmanAuctionsView {
  amIHighestBidder: boolean;
  currentHighestBidValue: number;
  endingTime: string;
  id: number;
  imageUrl: string;
  label: string;
  vehicleData: VehicleData;
}

export interface VehicleData {
  ez: string;
  fuelTypeText: string;
  mileageInKm: string;
  transmissionText: string;
}

// export interface VehicleImageUrl {
//   url: string;
// }

// export interface VehicleImages {
//   front: string;
// }

// export interface VehicleImage {
//   // _fk_associatedVehicle: number;
//   // encoding: string;
//   // mimeType: string;
//   // perspective: number;
//   // rawData: any;
//   url: string;
// }

// export interface VehicleImages {
//   // back: VehicleImage;
//   front: VehicleImage;
//   // interior: VehicleImage;
//   // leftSide: VehicleImage;
//   // leftSideBack: VehicleImage;
//   // other1: VehicleImage;
//   // other2: VehicleImage;
//   // other3: VehicleImage;
//   // other4: VehicleImage;
//   // rightSide: VehicleImage;
//   // rightSideBack: VehicleImage;
//   // trunk: VehicleImage;
// }

// export interface Vehicle {
//   // accidentDescription: string;
//   // ad: '0' | '0' | '1' | '2';
//   // additional: string;
//   // additionalDamages: string;
//   // attachments: any;
//   // category: number;
//   // color: string;
//   // coupling: '0' | '0' | '1' | '2';
//   // damages: any;
//   // datBaseModelRaw: string;
//   // dimensionHeightInCm: number;
//   // dimensionLengthInCm: number;
//   // dimensionWidthInCm: number;
//   // doors: '0' | '0' | '1' | '2';
//   // enginePowerInHp: number;
//   // engineSizeInCcm: number;
//   // euroNorm: string;
//   ez: string;
//   fuelType: string;
//   // fullServiceHistory: boolean;
//   // hadAccident: boolean;
//   // headlights: '0' | '0' | '1' | '2' | '3';
//   // huReportExists: boolean;
//   // id: number;
//   imageUrls: VehicleImages; // <------------
//   // isReadyToDrive: boolean;
//   // isReimportedVehicle: boolean;
//   // lastCheckAtMileage: number;
//   // lastHu: string;
//   // make: string;
//   mileageInKm: string;
//   // model: string;
//   // navigation: number;
//   // numKeys: number;
//   // numPreOwners: number;
//   // numSeats: number;
//   // parkingAssistance: '0' | '0' | '1' | '2' | '3';
//   // sportPackage: number;
//   // sunRoof: number;
//   transmission: string;
//   // unloadedWeightInKg: number;
//   // upholstery: '0' | '0' | '1' | '2' | '3';
//   // urlToAttachment1: string;
//   // urlToAttachment2: string;
//   // urlToAttachment3: string;
//   // urlToVehicleSummarySheet: string;
//   // vatIdReportable: boolean;
//   // vehicleCondition: number;
//   // vehicleHeater: '0' | '0' | '1' | '2';
//   // vin: string;
// }

// export interface SalesmanAuctionsView {
//   [index: string]: any;
//   // label: string;
//   // state: string;
//   amIHighestBidder: boolean;
//   // createdAt: string;
//   endingTime: string;
//   id: number;
//   // incomingPaymentConfirmedAt: string;
//   // locationCountryCode: string;
//   // outgoingPaymentConfirmedAt: string;
//   // paymentDueDate: string;
//   // pickupConfirmedAt: string;
//   // pickupDueDate: string;
//   // purchaseConfirmedAt: string;
//   // purchaseRejectedAt: string;
//   // remainingTimeForInstantPurchaseInSeconds: number;
//   // remainingTimeInSeconds: number;
//   // startedAt: string;

//   associatedVehicle: Vehicle; // <------------
//   currentHighestBidValue: number;
//   // locationAddress: string;
//   // locationCity: string;
//   // locationCountry: string;
//   // locationZip: string;
//   // minimumRequiredAsk: number;
//   // numBids: number;
//   // originalMinimumRequiredAsk: number;
//   // purchasePrice: number;

//   // advertisementHtmlContent: string;
//   // allowInstantPurchase: boolean;
//   // auctioningIterations: number;
//   // buyerComplaint: '0' | '1' | '2' | '3' | '4' | '5';
//   // didEndWithInstantPurchase: boolean;
//   // hotBid: boolean;
//   // instantPurchasePossibleUntil: string;
//   // instantPurchasePrice: number;
//   // invoice: any;
//   // isPaidByBuyer: boolean;
//   // isRatedByBuyer: boolean;
//   // isRatedByDealership: boolean;
//   // priority: number;
//   // urlToInvoice: string;
//   // urlToPickUpAuthorizationDocument: string;
// }
