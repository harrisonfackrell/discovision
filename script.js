async function getJSON(filepath) {
    fetch(filepath)
    .then(response => response.json())
    .then(data => {
        return data
    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });
}
function load_details(skill) {
    document.getElementById("skill-details").className = "open"
    document.getElementById("skill-name").innerText = skill.name.toUpperCase()
    if (localStorage.getItem(skill.name + "level")) {
        document.getElementById("skill-level").innerText = localStorage.getItem(skill.name + "level")
    } else {
        document.getElementById("skill-level").innerText = "1"
    }
    document.getElementById("skill-detail-image").src = "img/skill/" + skill.img
    document.getElementById("skill-detail-cool-for").innerText = "Cool For: " +  skill.cool_for
    document.getElementById("skill-detail-desc-short").innerText = skill.desc_short
    document.getElementById("skill-detail-desc-long").innerHTML = skill.desc_long

    document.querySelector("#check-menu .closer").onclick = () => {
        document.getElementById("check-menu").className = "inactive"
        console.log(document.querySelector("#check-list").innerHTML)
        localStorage.setItem(skill.name, document.querySelector("#journal").innerHTML)
    }
    document.querySelector("#view-checks-button").onclick = () => {
        document.querySelector("#check-menu").className = "active"
        document.querySelector("#journal").innerHTML = localStorage.getItem(skill.name)
    }
    document.querySelector("#level-up-button").onclick = () => {
        var level = parseInt(document.querySelector("#skill-level").innerText) + 1
        localStorage.setItem(skill.name + "level", level.toString())
        document.querySelector("#skill-level").innerText = level.toString()
    }
}
function inflate_check_list(check_list) {
    str = ""
    for (var i = 0; i < check_list.length; i++) {
        str += "<p contenteditable=true>" + check_list[i] + "</p>"
    }
    return str;
}
window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.pageX / window.innerWidth);
    document.documentElement.style.setProperty('--mouse-y', e.pageY / window.innerHeight);
});
Skill = function(skill_json) {
    Object.assign(this, skill_json);
    if (localStorage.getItem(this.name + "level")) {
        this.level = localStorage.getItem(this.name + "level")
    } else {
        this.level = 0
    }
    this.inflate = () => {
        rep = document.createElement("div")
        rep.className = "skill"
        image = document.createElement("img")
        image.src = "img/skill/" + this.img
        rep.appendChild(image)
        title = document.createElement("p")
        title.innerHTML = this.name.toUpperCase()
        rep.appendChild(title)
        rep.onclick = () => load_details(skill_json)
        return rep
    }
    return this
}
for (var i = 0; i < Object.values(skills.intellect).length; i++) {
    document.getElementById("int").appendChild(Skill(Object.values(skills.intellect)[i]).inflate())
}
for (var i = 0; i < Object.values(skills.psyche).length; i++) {
    document.getElementById("psy").appendChild(Skill(Object.values(skills.psyche)[i]).inflate())
}
for (var i = 0; i < Object.values(skills.physique).length; i++) {
    document.getElementById("fys").appendChild(Skill(Object.values(skills.physique)[i]).inflate())
}
for (var i = 0; i < Object.values(skills.motorics).length; i++) {
    document.getElementById("mot").appendChild(Skill(Object.values(skills.motorics)[i]).inflate())
}
document.querySelector("#skill-details .closer").onclick = () => {
    document.getElementById("skill-details").className = "closed"
}
document.querySelector("#overview-toggle").onclick = () => {
    document.querySelector("#overview-toggle").className = "active"
    document.querySelector("#info-toggle").className = "inactive"
    document.querySelector("#overview").className = "active"
    document.querySelector("#info").className = "inactive"
}
document.querySelector("#info-toggle").onclick = () => {
    document.querySelector("#info-toggle").className = "active"
    document.querySelector("#overview-toggle").className = "inactive"
    document.querySelector("#info").className = "active"
    document.querySelector("#overview").className = "inactive"
}
document.querySelector("#check-menu .closer").onclick = () => {
    document.getElementById("check-menu").className = "inactive"
    console.log(document.querySelector("#check-list").innerHTML)
}
