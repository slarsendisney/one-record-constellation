export const Product = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:Product",
  "cargo:description": "Apple MacBook Air 15-inch M2",
  descriptionForContentOfPieces: {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/piece-11",
  },
};

export const Piece = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:Piece",
  "cargo:contentDescribedByProducts": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/product-p1",
  },
  "cargo:goodsDescription": "Electricals, not restricted",
  "cargo:partOfShipment": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/shipment-5",
  },
};

export const Shipment = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:Shipment",
  "cargo:shipmentOfPieces": [
    {
      "@id": "https://london.one-record.lhind.dev/logistics-objects/piece-11",
    },
  ],
  "cargo:waybill": {
    "@id":
      "https://london.one-record.lhind.dev/logistics-objects/waybill-awb-020-12345675",
  },
};

export const shipper = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "https://onerecord.iata.org/ns/cargo#Organization",
  "cargo:basedAtLocation": {
    "@type": "cargo:Location",
    "cargo:locationName": "Warehouse 1",
    "cargo:locationType": "Warehouse",
    "cargo:geolocation": {
      "@type": "cargo:Geolocation",
      "cargo:longitude": "",
      "cargo:latitude": "",
    },
  },
  "cargo:name": "SHIPPER NAME",
};

export const waybill = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:Waybill",
  "cargo:arrivalLocation": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/jfk",
  },
  "cargo:departureLocation": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/ham",
  },
  "cargo:involvedParties": [
    {
      "@id": "neone:7fc12eb5-14c6-49e3-ac9b-443abbcea991",
      "@type": "cargo:Party",
      "cargo:organization": {
        "@id":
          "https://london.one-record.lhind.dev/logistics-objects/organization-shp",
      },
      "cargo:role": "Shipper",
    },
    {
      "@id": "neone:a1461864-0256-49bd-9164-80deaf400a13",
      "@type": "cargo:Party",
      "cargo:organization": {
        "@id":
          "https://london.one-record.lhind.dev/logistics-objects/organization-cne",
      },
      "cargo:role": "Consignee",
    },
    {
      "@id": "neone:7cb245d3-0b70-4d47-81e4-549aa2961a59",
      "@type": "cargo:Party",
      "cargo:organization": {
        "@id":
          "https://london.one-record.lhind.dev/logistics-objects/company-fwd",
      },
      "cargo:role": "FreightForwarder",
    },
  ],
  "cargo:referredBookingOption": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/booking-1",
  },
  "cargo:shipment": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/shipment-5",
  },
  "cargo:waybillPrefix": "020",
  "cargo:waybillType": "Master",
  "cargo:waybillnumber": "12345675",
};

export const booking = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "https://onerecord.iata.org/ns/cargo#Booking",
  "cargo:activitySequences": [
    {
      "@id": "neone:1f3d79d5-ca6b-4ac3-86ca-efe97feec621",
      "@type": "cargo:ActivitySequence",
      "cargo:activity": {
        "@id":
          "https://london.one-record.lhind.dev/logistics-objects/transport-movement-1",
      },
      "cargo:sequenceNumber": "1",
    },
    {
      "@id": "neone:dbfa9b98-01aa-4e6d-a1cb-fd74de0f5147",
      "@type": "cargo:ActivitySequence",
      "cargo:activity": {
        "@id":
          "https://london.one-record.lhind.dev/logistics-objects/transport-movement-2",
      },
      "cargo:sequenceNumber": "2",
    },
  ],
  "cargo:issuedForWaybill": {
    "@id":
      "https://london.one-record.lhind.dev/logistics-objects/waybill-awb-020-12345675",
  },
};

export const transportMovement = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:TransportMovement",
  "cargo:actions": [
    {
      "@id":
        "https://london.one-record.lhind.dev/logistics-objects/action-onloading-1-1",
    },
    {
      "@id":
        "https://london.one-record.lhind.dev/logistics-objects/action-onloading-1-2",
    },
    {
      "@id":
        "https://london.one-record.lhind.dev/logistics-objects/action-offloading-1-2",
    },
  ],
  "cargo:arrivalLocation": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/fra",
  },
  "cargo:departureLocation": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/ham",
  },
  "cargo:executionStatus": "complete",
  "cargo:modeQualifier": "Main-Carriage",
  "cargo:movementTimes": [
    {
      "@id": "neone:f66c063a-8cbc-47fb-9a1b-3b67ce755e1e",
      "@type": "cargo:MovementTime",
      "cargo:direction": "Outbound",
      "cargo:movementTimeStamp": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2023-05-01T20:00:00Z",
      },
      "cargo:movementTimeType": "Scheduled",
    },
    {
      "@id": "neone:7f904f3b-d772-4ff0-8e08-d152f82f1f87",
      "@type": "cargo:MovementTime",
      "cargo:direction": "Inbound",
      "cargo:movementTimeStamp": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2023-05-01T21:10:00Z",
      },
      "cargo:movementTimeType": "Scheduled",
    },
    {
      "@id": "neone:c1db2d94-4697-4e41-b90f-1693ec05cd56",
      "@type": "cargo:MovementTime",
      "cargo:direction": "Outbound",
      "cargo:movementTimeStamp": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2023-05-01T20:00:00Z",
      },
      "cargo:movementTimeType": "Actual",
    },
    {
      "@id": "neone:430d8a31-9764-48f3-b250-0cfcd54fbbe4",
      "@type": "cargo:MovementTime",
      "cargo:direction": "Inbound",
      "cargo:movementTimeStamp": {
        "@type": "http://www.w3.org/2001/XMLSchema#dateTime",
        "@value": "2023-05-01T21:15:00Z",
      },
      "cargo:movementTimeType": "Actual",
    },
  ],
  "cargo:operatingTransportMeans": {
    "@id":
      "https://london.one-record.lhind.dev/logistics-objects/transport-means-1",
  },
  "cargo:servedServices": {
    "@id": "https://london.one-record.lhind.dev/logistics-objects/booking-1",
  },
  "cargo:transportIdentifier": "LH033",
};

export const transportMeans = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:TransportMeans",
  "cargo:operatedTransportMovements": {
    "@id":
      "https://london.one-record.lhind.dev/logistics-objects/transport-movement-1",
  },
  "cargo:vehicleModel": "Boeing 777 Freighter",
  "cargo:vehicleType": "Aircraft",
  "cargo:typicalCo2Coefficient": "90", //kg per passenger per hour
};

export const location = {
  "@context": {
    cargo: "https://onerecord.iata.org/ns/cargo#",
  },
  "@type": "cargo:Location",
  "cargo:code": "JFK",
  "cargo:locationName": "John F. Kennedy International Airport",
  "cargo:locationType": "Airport",
  "cargo:geolocation": {
    "@type": "cargo:Geolocation",
    "cargo:longitude": "",
    "cargo:latitude": "",
  },
};

export const airport = {};
export const Plane = {};
export const Arrival = {};
export const Courier = {};
export const Destination = {};
