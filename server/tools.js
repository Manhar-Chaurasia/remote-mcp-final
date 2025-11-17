import { hubspotClient } from "../server/hubspot.js";

export async function runTool(name, args) {
  switch (name) {
    case "getContacts":
      return await getContacts();
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function getContacts() {
  const contacts = await hubspotClient.crm.contacts.basicApi.getPage(50);
  return { contacts };
}
