export class AlarmObject {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    const url = new URL(request.url);
    
    if (url.pathname === "/start") {
      await this.state.storage.setAlarm(Date.now() + 5000);
      return new Response("⏰ Alarm gestartet");
    }
    
    if (url.pathname === "/tick") {
      const lastTick = await this.state.storage.get("lastTick") || 0;
      return new Response(JSON.stringify({ lastTick }));
    }
    
    return new Response("OK");
  }

  async alarm() {
    await this.state.storage.put("lastTick", Date.now());
    await this.state.storage.setAlarm(Date.now() + 5000);
  }
}

export default {
  async fetch(request, env, ctx) {
    const id = env.ALARM_DO.idFromName("alarm-1");
    const stub = env.ALARM_DO.get(id);
    return stub.fetch(request);
  }
};
