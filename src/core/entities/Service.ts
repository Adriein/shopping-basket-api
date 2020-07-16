export interface Service {
  send(...args: any[]): Promise<any>;
}
