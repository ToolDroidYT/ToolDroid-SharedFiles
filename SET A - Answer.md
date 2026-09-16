# Packet Tracer Solution — Inter-Branch Corporate Network

## 1. Subnetting

Each department requires **62 usable hosts**.

A `/26` subnet provides:

- Total addresses: `2^(32-26) = 64`
- Network address: 1
- Broadcast address: 1
- **Usable hosts: 62**

Therefore, each `/24` must be divided into **four `/26` subnets**.

### Network 1 — Head Office

| VLAN | Department        | Network             | Usable Range                      | Broadcast        | Default Gateway  |
| ---- | ----------------- | ------------------- | --------------------------------- | ---------------- | ---------------- |
| 10   | HR                | `192.168.10.0/26`   | `192.168.10.1 – 192.168.10.62`    | `192.168.10.63`  | `192.168.10.1`   |
| 20   | Finance           | `192.168.10.64/26`  | `192.168.10.65 – 192.168.10.126`  | `192.168.10.127` | `192.168.10.65`  |
| 30   | Sales & Marketing | `192.168.10.128/26` | `192.168.10.129 – 192.168.10.190` | `192.168.10.191` | `192.168.10.129` |
| 40   | IT                | `192.168.10.192/26` | `192.168.10.193 – 192.168.10.254` | `192.168.10.255` | `192.168.10.193` |

Subnet mask for all:

```text
255.255.255.192
```

### Network 2 — Branch Office

| VLAN | Department        | Network             | Usable Range                      | Broadcast        | Default Gateway  |
| ---- | ----------------- | ------------------- | --------------------------------- | ---------------- | ---------------- |
| 10   | HR                | `192.168.11.0/26`   | `192.168.11.1 – 192.168.11.62`    | `192.168.11.63`  | `192.168.11.1`   |
| 20   | Finance           | `192.168.11.64/26`  | `192.168.11.65 – 192.168.11.126`  | `192.168.11.127` | `192.168.11.65`  |
| 30   | Sales & Marketing | `192.168.11.128/26` | `192.168.11.129 – 192.168.11.190` | `192.168.11.191` | `192.168.11.129` |
| 40   | IT                | `192.168.11.192/26` | `192.168.11.193 – 192.168.11.254` | `192.168.11.255` | `192.168.11.193` |

---

# 2. Recommended Topology

Your router should **not** have three separate ROAS trunks to the three switches. That is unnecessary and creates a bad topology for this design.

Use:

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

                       ||
                    WAN link
                       ||

                    BRANCH
                       R2
                       |
                    trunk
                       |
                     SW1
                    /   \
               trunk     trunk
                /         \
              SW2         SW3
```

Each switch has four access ports for its four PCs.

Use:

- `Fa0/1` → PC 1
- `Fa0/2` → PC 2
- `Fa0/3` → PC 3
- `Fa0/4` → PC 4
- `Fa0/24` → uplink
- `Fa0/23` → second uplink where necessary

---

# 3. PC Addressing

You can use sequential addresses.

## Head Office

### Switch 1

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | IT         | `192.168.10.194` |
| PC2 | Sales      | `192.168.10.130` |
| PC3 | Finance    | `192.168.10.66`  |
| PC4 | HR         | `192.168.10.2`   |

### Switch 2

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | IT         | `192.168.10.195` |
| PC2 | Sales      | `192.168.10.131` |
| PC3 | Finance    | `192.168.10.67`  |
| PC4 | HR         | `192.168.10.3`   |

### Switch 3

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | IT         | `192.168.10.196` |
| PC2 | Sales      | `192.168.10.132` |
| PC3 | Finance    | `192.168.10.68`  |
| PC4 | HR         | `192.168.10.4`   |

Subnet mask:

```text
255.255.255.192
```

Gateways:

```text
HR      → 192.168.10.1
Finance → 192.168.10.65
Sales   → 192.168.10.129
IT      → 192.168.10.193
```

---

## Branch Office

### Switch 1

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | HR         | `192.168.11.2`   |
| PC2 | Finance    | `192.168.11.66`  |
| PC3 | Sales      | `192.168.11.130` |
| PC4 | IT         | `192.168.11.194` |

### Switch 2

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | HR         | `192.168.11.3`   |
| PC2 | Finance    | `192.168.11.67`  |
| PC3 | Sales      | `192.168.11.131` |
| PC4 | IT         | `192.168.11.195` |

### Switch 3

| PC  | Department | IP               |
| --- | ---------- | ---------------- |
| PC1 | HR         | `192.168.11.4`   |
| PC2 | Finance    | `192.168.11.68`  |
| PC3 | Sales      | `192.168.11.132` |
| PC4 | IT         | `192.168.11.196` |

Subnet mask:

```text
255.255.255.192
```

Gateways:

```text
HR      → 192.168.11.1
Finance → 192.168.11.65
Sales   → 192.168.11.129
IT      → 192.168.11.193
```

---

# 4. WAN Link

Use a `/30` network between the routers.

```text
10.0.0.0/30
```

| Device   | Interface | IP         |
| -------- | --------- | ---------- |
| Router 1 | G0/1      | `10.0.0.1` |
| Router 2 | G0/1      | `10.0.0.2` |

Mask:

```text
255.255.255.252
```

---

# 5. Router 1 — Head Office

```cisco
enable
configure terminal

hostname R1

interface g0/0
 no shutdown
exit

interface g0/0.10
 encapsulation dot1Q 10
 ip address 192.168.10.1 255.255.255.192
exit

interface g0/0.20
 encapsulation dot1Q 20
 ip address 192.168.10.65 255.255.255.192
exit

interface g0/0.30
 encapsulation dot1Q 30
 ip address 192.168.10.129 255.255.255.192
exit

interface g0/0.40
 encapsulation dot1Q 40
 ip address 192.168.10.193 255.255.255.192
exit

interface g0/1
 ip address 10.0.0.1 255.255.255.252
 no shutdown
exit
```

### Static routes to authorized Branch networks

```cisco
ip route 192.168.11.0 255.255.255.192 10.0.0.2
ip route 192.168.11.64 255.255.255.192 10.0.0.2
```

Notice what is **not** present:

```text
192.168.11.128/26  ← Sales
192.168.11.192/26  ← IT
```

Therefore R1 has no route to Branch Sales or Branch IT.

---

# 6. Router 2 — Branch Office

```cisco
enable
configure terminal

hostname R2

interface g0/0
 no shutdown
exit

interface g0/0.10
 encapsulation dot1Q 10
 ip address 192.168.11.1 255.255.255.192
exit

interface g0/0.20
 encapsulation dot1Q 20
 ip address 192.168.11.65 255.255.255.192
exit

interface g0/0.30
 encapsulation dot1Q 30
 ip address 192.168.11.129 255.255.255.192
exit

interface g0/0.40
 encapsulation dot1Q 40
 ip address 192.168.11.193 255.255.255.192
exit

interface g0/1
 ip address 10.0.0.2 255.255.255.252
 no shutdown
exit
```

### Static routes to authorized Head Office networks

```cisco
ip route 192.168.10.0 255.255.255.192 10.0.0.1
ip route 192.168.10.64 255.255.255.192 10.0.0.1
```

Again, there are deliberately no static routes for:

```text
192.168.10.128/26  ← Sales
192.168.10.192/26  ← IT
```

---

# 7. Head Office Switches

## SW1

Because SW1 connects to the router, its uplink is a trunk.

```cisco
enable
configure terminal

hostname SW1-HQ

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

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

interface fa0/23
 switchport mode trunk
exit

interface fa0/24
 switchport mode trunk
exit
```

Here:

- `Fa0/23` → SW2
- `Fa0/24` → R1

## SW2

```cisco
enable
configure terminal

hostname SW2-HQ

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

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

interface fa0/24
 switchport mode trunk
exit
```

`Fa0/24` connects to SW1.

## SW3

```cisco
enable
configure terminal

hostname SW3-HQ

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

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

interface fa0/24
 switchport mode trunk
exit
```

---

# 8. Branch Office Switches

## SW1

```cisco
enable
configure terminal

hostname SW1-BRANCH

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

interface fa0/1
 switchport mode access
 switchport access vlan 10
exit

interface fa0/2
 switchport mode access
 switchport access vlan 20
exit

interface fa0/3
 switchport mode access
 switchport access vlan 30
exit

interface fa0/4
 switchport mode access
 switchport access vlan 40
exit

interface fa0/23
 switchport mode trunk
exit

interface fa0/24
 switchport mode trunk
exit
```

## SW2

```cisco
enable
configure terminal

hostname SW2-BRANCH

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

interface fa0/1
 switchport mode access
 switchport access vlan 10
exit

interface fa0/2
 switchport mode access
 switchport access vlan 20
exit

interface fa0/3
 switchport mode access
 switchport access vlan 30
exit

interface fa0/4
 switchport mode access
 switchport access vlan 40
exit

interface fa0/24
 switchport mode trunk
exit
```

## SW3

```cisco
enable
configure terminal

hostname SW3-BRANCH

vlan 10
 name HR
vlan 20
 name FINANCE
vlan 30
 name SALES
vlan 40
 name IT

interface fa0/1
 switchport mode access
 switchport access vlan 10
exit

interface fa0/2
 switchport mode access
 switchport access vlan 20
exit

interface fa0/3
 switchport mode access
 switchport access vlan 30
exit

interface fa0/4
 switchport mode access
 switchport access vlan 40
exit

interface fa0/24
 switchport mode trunk
exit
```

---

# 9. Important Switch Verification

Run this on every switch:

```cisco
show vlan brief
```

You should see:

```text
10  HR
20  FINANCE
30  SALES
40  IT
```

Check trunks:

```cisco
show interfaces trunk
```

You should see the uplink interfaces operating as trunks.

---

# 10. Router Verification

On R1:

```cisco
show ip interface brief
```

Expected important interfaces:

```text
G0/0.10    192.168.10.1
G0/0.20    192.168.10.65
G0/0.30    192.168.10.129
G0/0.40    192.168.10.193
G0/1       10.0.0.1
```

On R2:

```cisco
show ip interface brief
```

Expected:

```text
G0/0.10    192.168.11.1
G0/0.20    192.168.11.65
G0/0.30    192.168.11.129
G0/0.40    192.168.11.193
G0/1       10.0.0.2
```

---

# 11. Routing Table

On R1:

```cisco
show ip route
```

You should have entries similar to:

```text
C    192.168.10.0/26 is directly connected, GigabitEthernet0/0.10
C    192.168.10.64/26 is directly connected, GigabitEthernet0/0.20
C    192.168.10.128/26 is directly connected, GigabitEthernet0/0.30
C    192.168.10.192/26 is directly connected, GigabitEthernet0/0.40
C    10.0.0.0/30 is directly connected, GigabitEthernet0/1

S    192.168.11.0/26 [1/0] via 10.0.0.2
S    192.168.11.64/26 [1/0] via 10.0.0.2
```

No routes should exist for Branch:

```text
192.168.11.128/26
192.168.11.192/26
```

---

# 12. Answers to the Questions

## Question 1

**Test:** HR-PC on Switch 1 → HR-PC on Switch 2

Example:

```text
192.168.10.2 → 192.168.10.3
```

### Result

```text
SUCCESSFUL — Both PCs belong to VLAN 10 and are on the same subnet.
```

Expected:

```text
Reply from 192.168.10.3
```

---

## Question 2

**Test:** HR-PC → Finance-PC

Example:

```text
192.168.10.2 → 192.168.10.66
```

### Result

```text
SUCCESSFUL — Inter-VLAN routing through Router-on-a-Stick allows communication between VLAN 10 and VLAN 20.
```

This works because R1 has both VLAN interfaces:

```text
192.168.10.1
192.168.10.65
```

---

## Question 3

### Head Office HR → Branch Office HR

```text
192.168.10.2 → 192.168.11.2
```

### Result

```text
SUCCESSFUL
```

R1 uses:

```text
192.168.11.0/26 via 10.0.0.2
```

---

### Head Office Finance → Branch Office Finance

```text
192.168.10.66 → 192.168.11.66
```

### Result

```text
SUCCESSFUL
```

R1 uses:

```text
192.168.11.64/26 via 10.0.0.2
```

---

# 13. Question 4

On R1:

```cisco
show ip route
```

For the HR route:

**Destination Network:**

```text
192.168.11.0
```

**Subnet Mask:**

```text
255.255.255.192
```

**Next Hop:**

```text
10.0.0.2
```

You can also give the Finance route:

```text
Destination Network: 192.168.11.64
Subnet Mask:         255.255.255.192
Next Hop:            10.0.0.2
```

Both are valid authorized routes.

---

# 14. Question 5

## Head Office Sales & Marketing → Branch Sales & Marketing

Example:

```text
192.168.10.130 → 192.168.11.130
```

### Result

```text
FAILED — R1 has no route to 192.168.11.128/26.
```

The packet is dropped because that network is intentionally absent from R1's routing table.

---

## Head Office IT → Branch IT

Example:

```text
192.168.10.194 → 192.168.11.194
```

### Result

```text
FAILED — R1 has no route to 192.168.11.192/26.
```

---

# 15. Packet Tracer Note Component — Ready-to-Paste Answers

# Connectivity Test Results

## 1. Same Department, Different Switches

**Test:** HR-PC on Switch 1 → HR-PC on Switch 2

**Result:** SUCCESSFUL. Both PCs belong to VLAN 10 and are in the same subnet, `192.168.10.0/26`.

---

## 2. Different VLANs

**Test:** HR-PC → Finance-PC

**Result:** SUCCESSFUL. Inter-VLAN routing is enabled using Router-on-a-Stick.

---

## 3. Authorized Inter-Office Communication

**Head Office HR → Branch Office HR**

**Result:** SUCCESSFUL.

**Head Office Finance → Branch Office Finance**

**Result:** SUCCESSFUL.

---

## 4. Router 1 Routing Table

**Destination Network:** `192.168.11.0`

**Subnet Mask:** `255.255.255.192`

**Next Hop:** `10.0.0.2`

This route is used to reach the authorized HR network in Network 2.

---

## 5. Unauthorized Inter-Office Communication

**Head Office Sales & Marketing → Branch Office Sales & Marketing**

**Result:** FAILED. No route exists on Router 1 to `192.168.11.128/26`.

**Head Office IT → Branch Office IT**

**Result:** FAILED. No route exists on Router 1 to `192.168.11.192/26`.

## One important caveat

This design implements the requirement at the **subnet-routing level**: VLAN 10 and VLAN 20 are routable between offices, while VLAN 30 and VLAN 40 are not.

It does **not** prevent, for example, Head Office HR from reaching Branch Finance, because both authorized subnets are routed. The wording of your scenario suggests that VLANs 10 and 20 are the departments permitted to cross branches, so this is normally acceptable. If your instructor means **HR may communicate only with HR and Finance only with Finance**, then you need extended ACLs on R1/R2 in addition to the static routes.
