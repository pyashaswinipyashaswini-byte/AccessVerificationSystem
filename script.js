// =====================================================
// RESEARCHER DATABASE
// =====================================================

const researchers = {

    101: {
        name: "Rahul",
        zone: "LAB1",
        permission: true,
        revoked: false
    },

    102: {
        name: "Priya",
        zone: "LAB2",
        permission: true,
        revoked: false
    },

    103: {
        name: "Aman",
        zone: "LAB1",
        permission: true,
        revoked: false
    },

    104: {
        name: "Neha",
        zone: "LAB3",
        permission: true,
        revoked: false
    }

};


// =====================================================
// SYSTEM VARIABLES
// =====================================================

let emergencyLockdown = false;

let accessHistory = [];


// =====================================================
// CHANGE PAGE
// =====================================================

function showPage(pageID) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove("active-page");

        });


    document
        .getElementById(pageID)
        .classList.add("active-page");


    document
        .querySelectorAll(".nav-button")
        .forEach(button => {

            button.classList.remove("active");

        });


    if (pageID === "researcherPage") {

        document
            .querySelectorAll(".nav-button")[0]
            .classList.add("active");

    }

    else {

        document
            .querySelectorAll(".nav-button")[1]
            .classList.add("active");

    }


    updateDashboard();

}


// =====================================================
// REQUEST ACCESS
// =====================================================

function requestAccess() {


    const id =
        document.getElementById("researcherID").value;


    const zone =
        document.getElementById("requestedZone").value;


    resetVerification();


    if (!id) {

        showResult(
            "🔴 ENTER RESEARCHER ID",
            "denied"
        );

        return;

    }


    // Search researcher

    const researcher =
        researchers[id];


    // Researcher not found

    if (!researcher) {

        document.getElementById("authentication")
            .innerText = "✗ NOT FOUND";


        showResult(
            "🔴 ACCESS DENIED - Researcher Not Found",
            "denied"
        );


        addAccessHistory(
            id,
            "Unknown",
            zone,
            "DENIED",
            "Researcher ID not found"
        );


        return;

    }


    // Display researcher information

    document.getElementById("researcherName")
        .innerText = researcher.name;


    document.getElementById("authorizedZone")
        .innerText = researcher.zone;


    document.getElementById("researcherPermission")
        .innerText =
        researcher.permission
            ? "ACTIVE"
            : "NOT AVAILABLE";


    document.getElementById("researcherStatus")
        .innerText =
        researcher.revoked
            ? "REVOKED"
            : "ACTIVE";


    // =================================================
    // AUTHENTICATION
    // =================================================

    document.getElementById("authentication")
        .innerText = "✓ VERIFIED";


    // =================================================
    // AUTHORIZATION
    // =================================================

    if (researcher.zone !== zone) {

        document.getElementById("authorization")
            .innerText = "✗ NOT AUTHORIZED";


        showResult(
            "🔴 ACCESS DENIED - Unauthorized Zone",
            "denied"
        );


        addAccessHistory(
            id,
            researcher.name,
            zone,
            "DENIED",
            "Unauthorized laboratory zone"
        );


        return;

    }


    document.getElementById("authorization")
        .innerText = "✓ AUTHORIZED";


    // =================================================
    // PERMISSION
    // =================================================

    if (!researcher.permission) {

        document.getElementById("permission")
            .innerText = "✗ NO PERMISSION";


        showResult(
            "🔴 ACCESS DENIED - Permission Unavailable",
            "denied"
        );


        addAccessHistory(
            id,
            researcher.name,
            zone,
            "DENIED",
            "Permission unavailable"
        );


        return;

    }


    document.getElementById("permission")
        .innerText = "✓ ACTIVE";


    // =================================================
    // REVOCATION
    // =================================================

    if (researcher.revoked) {

        document.getElementById("revocation")
            .innerText = "✗ REVOKED";


        showResult(
            "🔴 ACCESS DENIED - Access Revoked",
            "denied"
        );


        addAccessHistory(
            id,
            researcher.name,
            zone,
            "DENIED",
            "Researcher access revoked"
        );


        return;

    }


    document.getElementById("revocation")
        .innerText = "✓ NOT REVOKED";


    // =================================================
    // EMERGENCY LOCKDOWN
    // =================================================

    if (emergencyLockdown) {

        document.getElementById("lockdown")
            .innerText = "✗ LOCKDOWN ACTIVE";


        showResult(
            "🔴 ACCESS DENIED - Emergency Lockdown",
            "denied"
        );


        addAccessHistory(
            id,
            researcher.name,
            zone,
            "DENIED",
            "Emergency lockdown active"
        );


        return;

    }


    document.getElementById("lockdown")
        .innerText = "✓ INACTIVE";


    // =================================================
    // ACCESS GRANTED
    // =================================================

    showResult(
        "🟢 ACCESS GRANTED",
        "granted"
    );


    addAccessHistory(
        id,
        researcher.name,
        zone,
        "GRANTED",
        "All security checks passed"
    );

}


// =====================================================
// RESET VERIFICATION
// =====================================================

function resetVerification() {

    document.getElementById("authentication")
        .innerText = "Checking...";

    document.getElementById("authorization")
        .innerText = "Checking...";

    document.getElementById("permission")
        .innerText = "Checking...";

    document.getElementById("revocation")
        .innerText = "Checking...";

    document.getElementById("lockdown")
        .innerText = "Checking...";

}


// =====================================================
// DISPLAY RESULT
// =====================================================

function showResult(message, type) {

    const result =
        document.getElementById("result");


    result.innerText = message;


    if (type === "granted") {

        result.style.background = "#dcfce7";

        result.style.color = "#166534";

    }

    else {

        result.style.background = "#fee2e2";

        result.style.color = "#991b1b";

    }

}


// =====================================================
// ADD ACCESS HISTORY
// =====================================================

function addAccessHistory(
    id,
    name,
    zone,
    decision,
    reason
) {


    const now =
        new Date().toLocaleTimeString();


    accessHistory.unshift({

        id: id,

        name: name,

        zone: zone,

        decision: decision,

        reason: reason,

        time: now

    });


    updateHistory();

    updateDashboard();

}


// =====================================================
// UPDATE HISTORY TABLES
// =====================================================

function updateHistory() {


    const researcherTable =
        document.getElementById("researcherHistory");


    const adminTable =
        document.getElementById("adminHistory");


    researcherTable.innerHTML = "";

    adminTable.innerHTML = "";


    accessHistory.forEach(record => {


        // Researcher history

        const row =
            researcherTable.insertRow();


        row.insertCell(0)
            .innerText = record.id;


        row.insertCell(1)
            .innerText = record.name;


        row.insertCell(2)
            .innerText = record.zone;


        row.insertCell(3)
            .innerText = record.decision;


        row.insertCell(4)
            .innerText = record.time;


        // Admin history

        const adminRow =
            adminTable.insertRow();


        adminRow.insertCell(0)
            .innerText = record.id;


        adminRow.insertCell(1)
            .innerText = record.name;


        adminRow.insertCell(2)
            .innerText = record.zone;


        adminRow.insertCell(3)
            .innerText = record.decision;


        adminRow.insertCell(4)
            .innerText = record.reason;


        adminRow.insertCell(5)
            .innerText = record.time;

    });

}


// =====================================================
// UPDATE SECURITY DASHBOARD
// =====================================================

function updateDashboard() {


    // Total researchers

    document.getElementById("totalResearchers")
        .innerText =
        Object.keys(researchers).length;


    // Total requests

    document.getElementById("totalRequests")
        .innerText =
        accessHistory.length;


    // Granted

    document.getElementById("grantedRequests")
        .innerText =
        accessHistory.filter(
            r => r.decision === "GRANTED"
        ).length;


    // Denied

    document.getElementById("deniedRequests")
        .innerText =
        accessHistory.filter(
            r => r.decision === "DENIED"
        ).length;


    updateResearcherTable();

}


// =====================================================
// UPDATE RESEARCHER TABLE
// =====================================================

function updateResearcherTable() {


    const table =
        document.getElementById("researcherTable");


    table.innerHTML = "";


    Object.keys(researchers)
        .forEach(id => {


            const researcher =
                researchers[id];


            const row =
                table.insertRow();


            row.insertCell(0)
                .innerText = id;


            row.insertCell(1)
                .innerText =
                researcher.name;


            row.insertCell(2)
                .innerText =
                researcher.zone;


            row.insertCell(3)
                .innerText =
                researcher.permission
                    ? "ACTIVE"
                    : "DISABLED";


            row.insertCell(4)
                .innerText =
                researcher.revoked
                    ? "YES"
                    : "NO";


            const actionCell =
                row.insertCell(5);


            const button =
                document.createElement("button");


            button.innerText =
                researcher.revoked
                    ? "RESTORE"
                    : "REVOKE";


            button.style.padding = "8px 12px";

            button.style.border = "none";

            button.style.borderRadius = "5px";

            button.style.cursor = "pointer";


            button.onclick =
                function () {

                    toggleResearcherAccess(id);

                };


            actionCell.appendChild(button);

        });

}


// =====================================================
// REVOKE / RESTORE ACCESS
// =====================================================

function toggleResearcherAccess(id) {


    researchers[id].revoked =
        !researchers[id].revoked;


    updateDashboard();


    const action =
        researchers[id].revoked
            ? "Access revoked"
            : "Access restored";


    alert(
        action +
        " for " +
        researchers[id].name
    );

}


// =====================================================
// EMERGENCY LOCKDOWN
// =====================================================

function toggleLockdown() {


    emergencyLockdown =
        !emergencyLockdown;


    const button =
        document.getElementById("lockdownButton");


    const message =
        document.getElementById("lockdownMessage");


    if (emergencyLockdown) {

        button.innerText =
            "DISABLE LOCKDOWN";


        message.innerText =
            "⚠ Emergency lockdown is ACTIVE. All access requests will be denied.";


        button.style.background =
            "#166534";

    }

    else {

        button.innerText =
            "ENABLE LOCKDOWN";


        message.innerText =
            "Emergency lockdown is currently disabled.";


        button.style.background =
            "#d62828";

    }

}