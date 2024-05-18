import { NearBindgen, near, call, view, Vector } from 'near-sdk-js'
import { POINT_ONE, Claim } from './model'

@NearBindgen({})
class GuestBook {
  messages: Vector<Claim> = new Vector<Claim>("v-uid");

  @call({ payableFunction: true })
  // Public - Adds a new message.
  claim({ 
    policy_deductable,
    incident_date,
    policy_annual_premium, 
    incident_type, 
    collision_type,
    incident_severity,
    authorities_contacted,
    number_of_vehicles_involved,
    police_report_available,
    total_claim_amount,
    injury_claim,
    property_claim,
    vehicle_claim,
    }: { 
    policy_deductable: number, 
    incident_date: string, policy_annual_premium: number, incident_type: string, collision_type: string,
    incident_severity: string,
    authorities_contacted: string,
    number_of_vehicles_involved: number,
    police_report_available: string,
    total_claim_amount: number,
    injury_claim: number,
    property_claim: number,
    vehicle_claim: number, }) {
    
    const premium = near.attachedDeposit() >= BigInt(POINT_ONE);
    const sender = near.predecessorAccountId();
    let account_Id = near.predecessorAccountId();
    
    const message: Claim = {
    account_Id,
    policy_deductable, 
    incident_date, 
    policy_annual_premium, 
    incident_type, 
    collision_type, 
    incident_severity, 
    authorities_contacted,
    number_of_vehicles_involved,
    police_report_available,
    total_claim_amount,
    injury_claim, 
    property_claim, 
    vehicle_claim
    } ;
    this.messages.push(message);
  }

  @view({})
  // Returns an array of messages.
  get_messages({ from_index = 0, limit = 10 }: { from_index: number, limit: number }): Claim[] {
    return this.messages.toArray().slice(from_index, from_index + limit);
  }

  @view({})
  total_messages(): number { return this.messages.length }
}
