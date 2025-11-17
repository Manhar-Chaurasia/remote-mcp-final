import HubSpot from "@hubspot/api-client";

const accessToken = "pat-na1-43b0ac76-bb60-4053-9369-17f3517f87b7";

if (!accessToken) {
  throw new Error("Missing HUBSPOT_PRIVATE_TOKEN in environment variables");
}

export const hubspotClient = new HubSpot.Client({
  accessToken,
});
