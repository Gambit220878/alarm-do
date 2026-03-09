export class AlarmObject {
  constructor(state, env) {
    this.state = state;
  }

  async fetch(request) {
    return new Response("Alarm DO läuft");
  }
}

export default {
  async fetch(request, env, ctx) {
    const id = env.ALARM_DO.idFromName("alarm-1");
    const stub = env.ALARM_DO.get(id);
    return stub.fetch(request);
  }
};
