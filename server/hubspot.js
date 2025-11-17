import HubSpot from "@hubspot/api-client";

const accessToken = process.env.HUBSPOT_PRIVATE_TOKEN;

if (!accessToken) {
  throw new Error("Missing HUBSPOT_PRIVATE_TOKEN in environment variables");
}

export const hubspotClient = new HubSpot.Client({
  accessToken,
});
