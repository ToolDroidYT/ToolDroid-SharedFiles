# SCENARIO: INTER-BRANCH CORPORATE NETWORK - Set B

You have been hired as a **Network Administrator** for a company with two offices: the **Head Office** and the **Branch Office**.

The company has four major departments and the hosts addresses it needs:

- **Human Resources (HR)** - 62 usable hosts
- **Finance** - 62 usable hosts
- **Sales & Marketing** - 62 usable hosts
- **Information Technology (IT)** - 62 usable hosts

To improve network organization, management, and security, each department must be assigned to its own **VLAN and subnet**.

Both offices use the same network design. Each office has **one router** connected to **three switches**, and each switch has **four computers**. The four computers connected to every switch represent the four departments.

Therefore, each office has:

- 1 Router
- 3 Switches
- 4 PCs per switch
- 12 PCs in total

## NETWORK 1 — HEAD OFFICE

The Head Office uses the network block **192.168.20.0/24**. It consists of one router, three switches, and twelve computers. Each switch has one computer from each department:

| Switch   | PC 1 | PC 2              | PC 3    | PC 4 |
| -------- | ---- | ----------------- | ------- | ---- |
| Switch 1 | IT   | Sales & Marketing | Finance | HR   |
| Switch 2 | IT   | Sales & Marketing | Finance | HR   |
| Switch 3 | IT   | Sales & Marketing | Finance | HR   |

---

The departments are assigned the following VLANs:

| VLAN    | Department             |
| ------- | ---------------------- |
| VLAN 10 | Human Resources        |
| VLAN 20 | Finance                |
| VLAN 30 | Sales & Marketing      |
| VLAN 40 | Information Technology |

## NETWORK 2 - BRANCH OFFICE

The Branch Office uses the network block **192.168.21.0/24**.
It also consists of one router, three switches, and twelve computers.
Each switch has one computer from each department:

| Switch   | PC 1 | PC 2              | PC 3    | PC 4 |
| -------- | ---- | ----------------- | ------- | ---- |
| Switch 1 | IT   | Sales & Marketing | Finance | HR   |
| Switch 2 | IT   | Sales & Marketing | Finance | HR   |
| Switch 3 | IT   | Sales & Marketing | Finance | HR   |

The same VLAN structure must be implemented:

| VLAN    | Department             |
| ------- | ---------------------- |
| VLAN 10 | Human Resources        |
| VLAN 20 | Finance                |
| VLAN 30 | Sales & Marketing      |
| VLAN 40 | Information Technology |

## COMPANY NETWORK POLICY

The company requires selected departments to communicate between the Head Office and Branch Office.

For security reasons, only the **Human Resources** and **Finance** departments are authorized to **communicate between the two offices**.

Therefore:

- **HR (VLAN 10)** in the Head Office must be able to communicate with **HR (VLAN 10)** in the Branch Office.
- **Finance (VLAN 20)** in the Head Office must be able to communicate with **Finance (VLAN 20)** in the Branch Office.
- **Sales & Marketing (VLAN 30)** must not be able to communicate between the two offices.
- **IT (VLAN 40)** must not be able to communicate between the two offices.

Communication within the same office must remain functional according to the VLAN configuration.

## YOUR TASK

As the company's **Network Administrator**, configure the network in Cisco **Packet Tracer** according to the company's requirements.

You must:

1. Perform subnetting on the assigned network blocks.
2. Create four subnets capable of supporting the required number of usable hosts.
3. Assign the correct IP address, subnet mask, and default gateway to all PCs.
4. Create VLAN 10, VLAN 20, VLAN 30, and VLAN 40.
5. Assign the correct switch ports to the appropriate VLAN.
6. Configure the links between the switches and routers.
7. Configure Inter-VLAN Routing using Router-on-a-Stick (ROAS).
8. Establish a connection between the Head Office and Branch Office.
9. Configure appropriate static routes between the two networks.
10. Verify network connectivity using appropriate testing commands.
11. Demonstrate that the company's communication policy is correctly implemented.

## EXPECTED RESULT

The completed network must demonstrate the following:

### ALLOWED COMMUNICATION

**Head Office HR → Branch Office HR**

✓ Successful

**Head Office Finance → Branch Office Finance**

✓ Successful

### RESTRICTED COMMUNICATION

**Head Office Sales & Marketing → Branch Office Sales & Marketing**

X Must fail

**Head Office IT → Branch Office IT**

X Must fail

Students must provide connectivity tests demonstrating both **successful and failed communication** to prove that the network has been configured according to company policy.

# QUESTIONS

Based on your configuration, answer the following questions. Type your results using the **Note** component in Packet Tracer.

1. From Network 1, test communication between two PCs from the same **department** but connected to different switches.

**Test:** IT-PC on Switch 1 → IT-PC on Switch 2

**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

2. From **Network 1**, test communication between PCs belonging to **different VLANs**.

**Test:** IT-PC → Sales & Marketing-PC

**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

3. Test communication between the **authorized departments** across the Head Office and Branch Office.

**Perform:**

**Head Office HR → Branch Office HR**  
**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Head Office Finance → Branch Office Finance**  
**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

4. On Router 1, use the appropriate Cisco IOS command to display the routing table. Identify the route used to reach the authorized network in Network 2.

**Provide:**

**Destination Network:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Subnet Mask:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Next Hop:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

5.  Test communication between the **unauthorized departments** across the Head Office and Branch Office.

**Tests:**

**Head Office Sales & Marketing → Branch Office Sales & Marketing**  
**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_

**Head Office IT → Branch Office IT**
**Result:** \_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_\_
