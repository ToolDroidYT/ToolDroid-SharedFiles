# Packet Tracer Configuration — Set B

The clean design is:

- **4 × `/26` VLAN subnets per office**
- **Router-on-a-Stick** for inter-VLAN routing
- **One `/30` WAN subnet** between Router 1 and Router 2
- **Static routes only for HR and Finance**
- No routes between offices for VLAN 30 and VLAN 40, so those tests fail naturally

---

## 1. Subnetting

A `/26` provides:

- 64 total addresses
- 62 usable host addresses
- 1 network address
- 1 broadcast address

Exactly what each department requires.

### Network 1 — Head Office

| VLAN | Department        | Network             | Usable Host Range                 | Broadcast        | Default Gateway  |
| ---: | ----------------- | ------------------- | --------------------------------- | ---------------- | ---------------- |
|   10 | HR                | `192.168.20.0/26`   | `192.168.20.1 – 192.168.20.62`    | `192.168.20.63`  | `192.168.20.1`   |
|   20 | Finance           | `192.168.20.64/26`  | `192.168.20.65 – 192.168.20.126`  | `192.168.20.127` | `192.168.20.65`  |
|   30 | Sales & Marketing | `192.168.20.128/26` | `192.168.20.129 – 192.168.20.190` | `192.168.20.191` | `192.168.20.129` |
|   40 | IT                | `192.168.20.192/26` | `192.168.20.193 – 192.168.20.254` | `192.168.20.255` | `192.168.20.193` |

Subnet mask:

```text
255.255.255.192
```

### Network 2 — Branch Office

| VLAN | Department        | Network             | Usable Host Range                 | Broadcast        | Default Gateway  |
| ---: | ----------------- | ------------------- | --------------------------------- | ---------------- | ---------------- |
|   10 | HR                | `192.168.21.0/26`   | `192.168.21.1 – 192.168.21.62`    | `192.168.21.63`  | `192.168.21.1`   |
|   20 | Finance           | `192.168.21.64/26`  | `192.168.21.65 – 192.168.21.126`  | `192.168.21.127` | `192.168.21.65`  |
|   30 | Sales & Marketing | `192.168.21.128/26` | `192.168.21.129 – 192.168.21.190` | `192.168.21.191` | `192.168.21.129` |
|   40 | IT                | `192.168.21.192/26` | `192.168.21.193 – 192.168.21.254` | `192.168.21.255` | `192.168.21.193` |

---

# 2. WAN Link Between Routers

The `/24` LAN blocks are completely consumed by the four `/26` subnets, so the router-to-router connection should use a separate network.

Use:

```text
10.0.0.0/30
```

| Device   | Interface | IP            |
| -------- | --------- | ------------- |
| Router 1 | `G0/1`    | `10.0.0.1/30` |
| Router 2 | `G0/1`    | `10.0.0.2/30` |

Mask:

```text
255.255.255.252
```

---

# 3. PC IP Addressing

You can assign addresses systematically.

## Head Office

### Switch 1

| PC  | Department | IP               | Mask  | Gateway          |
| --- | ---------- | ---------------- | ----- | ---------------- |
| PC1 | IT         | `192.168.20.194` | `/26` | `192.168.20.193` |
| PC2 | Sales      | `192.168.20.130` | `/26` | `192.168.20.129` |
| PC3 | Finance    | `192.168.20.66`  | `/26` | `192.168.20.65`  |
| PC4 | HR         | `192.168.20.2`   | `/26` | `192.168.20.1`   |

### Switch 2

| PC  | Department | IP               | Mask  | Gateway          |
| --- | ---------- | ---------------- | ----- | ---------------- |
| PC1 | IT         | `192.168.20.195` | `/26` | `192.168.20.193` |
| PC2 | Sales      | `192.168.20.131` | `/26` | `192.168.20.129` |
| PC3 | Finance    | `192.168.20.67`  | `/26` | `192.168.20.65`  |
| PC4 | HR         | `192.168.20.3`   | `/26` | `192.168.20.1`   |

### Switch 3

| PC  | Department | IP               | Mask  | Gateway          |
| --- | ---------- | ---------------- | ----- | ---------------- |
| PC1 | IT         | `192.168.20.196` | `/26` | `192.168.20.193` |
| PC2 | Sales      | `192.168.20.132` | `/26` | `192.168.20.129` |
| PC3 | Finance    | `192.168.20.68`  | `/26` | `192.168.20.65`  |
| PC4 | HR         | `192.168.20.4`   | `/26` | `192.168.20.1`   |

Use the same pattern for Branch Office, replacing `192.168.20` with `192.168.21`.

For example:

```text
Branch HR:
192.168.21.2
192.168.21.3
192.168.21.4

Branch Finance:
192.168.21.66
192.168.21.67
192.168.21.68

Branch Sales:
192.168.21.130
192.168.21.131
192.168.21.132

Branch IT:
192.168.21.194
192.168.21.195
192.168.21.196
```

---

# 4. Router 1 — Head Office

Assume:

- `G0/0` → Switch 1
- `G0/1` → Router 2

```cisco
enable
configure terminal

hostname R1

! WAN link
interface g0/1
 ip address 10.0.0.1 255.255.255.252
 no shutdown
exit

! VLAN 10 - HR
interface g0/0.10
 encapsulation dot1Q 10
 ip address 192.168.20.1 255.255.255.192
exit

! VLAN 20 - Finance
interface g0/0.20
 encapsulation dot1Q 20
 ip address 192.168.20.65 255.255.255.192
exit

! VLAN 30 - Sales
interface g0/0.30
 encapsulation dot1Q 30
 ip address 192.168.20.129 255.255.255.192
exit

! VLAN 40 - IT
interface g0/0.40
 encapsulation dot1Q 40
 ip address 192.168.20.193 255.255.255.192
exit

interface g0/0
 no shutdown
exit
```

### Static routes on Router 1

Only HR and Finance are routed toward Branch Office:

```cisco
ip route 192.168.21.0 255.255.255.192 10.0.0.2
ip route 192.168.21.64 255.255.255.192 10.0.0.2
```

**Do not add routes for:**

```text
192.168.21.128/26   ← Sales
192.168.21.192/26   ← IT
```

Therefore Router 1 has no route to those networks.

Save:

```cisco
end
write memory
```

---

# 5. Router 2 — Branch Office

```cisco
enable
configure terminal

hostname R2

! WAN link
interface g0/1
 ip address 10.0.0.2 255.255.255.252
 no shutdown
exit

! VLAN 10 - HR
interface g0/0.10
 encapsulation dot1Q 10
 ip address 192.168.21.1 255.255.255.192
exit

! VLAN 20 - Finance
interface g0/0.20
 encapsulation dot1Q 20
 ip address 192.168.21.65 255.255.255.192
exit

! VLAN 30 - Sales
interface g0/0.30
 encapsulation dot1Q 30
 ip address 192.168.21.129 255.255.255.192
exit

! VLAN 40 - IT
interface g0/0.40
 encapsulation dot1Q 40
 ip address 192.168.21.193 255.255.255.192
exit

interface g0/0
 no shutdown
exit
```

Static routes back to Head Office:

```cisco
ip route 192.168.20.0 255.255.255.192 10.0.0.1
ip route 192.168.20.64 255.255.255.192 10.0.0.1
```

Again, **no routes for VLAN 30 and VLAN 40**.

```cisco
end
write memory
```

---

# 6. Switch VLAN Configuration

The same VLANs must exist on all six switches.

## Example — Switch 1, Head Office

```cisco
enable
configure terminal

hostname SW1-HQ

vlan 10
 name HR
exit

vlan 20
 name FINANCE
exit

vlan 30
 name SALES_MARKETING
exit

vlan 40
 name IT
exit
```

Assuming:

```text
Fa0/1 = IT
Fa0/2 = Sales
Fa0/3 = Finance
Fa0/4 = HR
```

configure:

```cisco
interface fa0/1
 switchport mode access
 switchport access vlan 40
exit

interface fa0/2
 switchport mode access
 switchport access vlan 30
exit

interface fa0/3
 switchport mode access
 switchport access vlan 20
exit

interface fa0/4
 switchport mode access
 switchport access vlan 10
exit
```

---

# 7. Trunk Configuration

The router connection must be a trunk.

For example, if `Fa0/24` connects to Router 1:

```cisco
interface fa0/24
 switchport mode trunk
exit
```

The connection between switches must also be trunks.

For example:

```cisco
interface fa0/23
 switchport mode trunk
exit
```

Repeat the VLAN and trunk configuration on:

```text
SW1-HQ
SW2-HQ
SW3-HQ

SW1-BR
SW2-BR
SW3-BR
```

The exact interface numbers depend on the Packet Tracer topology. Do **not** blindly use `Fa0/23`/`Fa0/24` if your topology uses Gigabit interfaces.

---

# 8. Important Switch Design

A reasonable topology is:

```text
                    HEAD OFFICE

                         R1
                         |
                       trunk
                         |
                       SW1
                      /   \
                 trunk     trunk
                   /         \
                 SW2         SW3


                    BRANCH OFFICE

                         R2
                         |
                       trunk
                         |
                       SW1
                      /   \
                 trunk     trunk
                   /         \
                 SW2         SW3


                   R1 -------- R2
                     10.0.0.0/30
```

All switches carry VLANs 10, 20, 30 and 40 across their trunk links.

---

# 9. Verify VLANs

On every switch:

```cisco
show vlan brief
```

You should see:

```text
10 HR
20 FINANCE
30 SALES_MARKETING
40 IT
```

Verify trunking:

```cisco
show interfaces trunk
```

---

# 10. Verify Router-on-a-Stick

On R1:

```cisco
show ip interface brief
```

Expected:

```text
G0/0.10    192.168.20.1
G0/0.20    192.168.20.65
G0/0.30    192.168.20.129
G0/0.40    192.168.20.193
G0/1       10.0.0.1
```

On R2:

```text
G0/0.10    192.168.21.1
G0/0.20    192.168.21.65
G0/0.30    192.168.21.129
G0/0.40    192.168.21.193
G0/1       10.0.0.2
```

---

# 11. Connectivity Tests

## Question 1

**IT-PC on Switch 1 → IT-PC on Switch 2**

Example:

```text
192.168.20.194 → 192.168.20.195
```

Command:

```text
ping 192.168.20.195
```

### Result

**Successful.**

Both PCs belong to VLAN 40 and therefore the same `/26` subnet.

---

# Question 2

**IT-PC → Sales & Marketing-PC**

Example:

```text
192.168.20.194 → 192.168.20.130
```

Command:

```text
ping 192.168.20.130
```

### Result

**Successful.**

They are different VLANs, but ROAS provides inter-VLAN routing through Router 1.

This is important: the scenario says communication **within the same office must remain functional**. Therefore different VLANs inside the same office are allowed to communicate unless explicitly prohibited.

---

# Question 3

## Head Office HR → Branch Office HR

```text
192.168.20.2 → 192.168.21.2
```

```text
ping 192.168.21.2
```

### Result

**Successful.**

Reason:

```text
R1
192.168.20.0/26
        ↓
10.0.0.2
        ↓
R2
192.168.21.0/26
```

There is a static route on both routers.

---

## Head Office Finance → Branch Office Finance

```text
192.168.20.66 → 192.168.21.66
```

```text
ping 192.168.21.66
```

### Result

**Successful.**

There is also a static route for:

```text
192.168.21.64/26
```

and a return route for:

```text
192.168.20.64/26
```

---

# 12. Question 4 — Routing Table

On Router 1:

```cisco
show ip route
```

You should see static routes similar to:

```text
S    192.168.21.0/26 [1/0] via 10.0.0.2
S    192.168.21.64/26 [1/0] via 10.0.0.2
```

### Authorized HR route

**Destination Network:**

```text
192.168.21.0
```

**Subnet Mask:**

```text
255.255.255.192
```

**Next Hop:**

```text
10.0.0.2
```

### Authorized Finance route

**Destination Network:**

```text
192.168.21.64
```

**Subnet Mask:**

```text
255.255.255.192
```

**Next Hop:**

```text
10.0.0.2
```

The exact question asks for an authorized network, so either the HR route or Finance route is appropriate. Listing both is safer.

---

# 13. Question 5 — Unauthorized Communication

## Head Office Sales → Branch Office Sales

```text
192.168.20.130 → 192.168.21.130
```

```text
ping 192.168.21.130
```

### Result

**Failed / Destination unreachable.**

There is deliberately **no static route** on Router 1 for:

```text
192.168.21.128/26
```

---

## Head Office IT → Branch Office IT

```text
192.168.20.194 → 192.168.21.194
```

```text
ping 192.168.21.194
```

### Result

**Failed / Destination unreachable.**

There is deliberately **no static route** on Router 1 for:

```text
192.168.21.192/26
```

---

# 14. Answers for the Packet Tracer Note

You can put this directly into the Note component:

```text
1. IT-PC on Switch 1 → IT-PC on Switch 2

Result:
Successful. Both PCs belong to VLAN 40 and the same subnet, so communication between them is successful.


2. IT-PC → Sales & Marketing-PC

Result:
Successful. The PCs are in different VLANs, but Router-on-a-Stick provides inter-VLAN routing within the Head Office.


3. Authorized Inter-Office Communication

Head Office HR → Branch Office HR

Result:
Successful. Static routes permit communication between 192.168.20.0/26 and 192.168.21.0/26.

Head Office Finance → Branch Office Finance

Result:
Successful. Static routes permit communication between 192.168.20.64/26 and 192.168.21.64/26.


4. Router 1 Routing Table

Destination Network:
192.168.21.0

Subnet Mask:
255.255.255.192

Next Hop:
10.0.0.2

Authorized Finance route:

Destination Network:
192.168.21.64

Subnet Mask:
255.255.255.192

Next Hop:
10.0.0.2


5. Unauthorized Inter-Office Communication

Head Office Sales & Marketing → Branch Office Sales & Marketing

Result:
Failed. No static route exists from Router 1 to 192.168.21.128/26.

Head Office IT → Branch Office IT

Result:
Failed. No static route exists from Router 1 to 192.168.21.192/26.
```

## One important correction

The requirement **does not say that different VLANs within the same office must be blocked**. It explicitly says communication within the same office must remain functional. Therefore:

```text
IT → Sales within HQ          SUCCESS
HR → Finance within HQ       SUCCESS
Sales HQ → Sales Branch      FAIL
IT HQ → IT Branch            FAIL
HR HQ → HR Branch            SUCCESS
Finance HQ → Finance Branch  SUCCESS
```

That distinction is the core of the configuration. Using ACLs to block all inter-VLAN traffic would violate the stated requirement.
