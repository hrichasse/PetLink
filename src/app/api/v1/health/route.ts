import { ok } from "@/shared/responses/api-response";

export async function GET() {
  return ok("Health check ok", {
    service: "petlink-backend",
    status: "up",
    timestamp: new Date().toISOString()
  });
}
