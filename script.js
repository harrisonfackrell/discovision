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
window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', e.pageX / window.innerWidth);
    document.documentElement.style.setProperty('--mouse-y', e.pageY / window.innerHeight);
    document.documentElement.style.setProperty('--mouse-x-raw', e.pageX);
    document.documentElement.style.setProperty('--mouse-y-raw', e.pageY);
});
const Skill = (skill_json) => ((json) => {
    var skill = {}
    skill = Object.assign(skill, json);
    var level = parseInt(localStorage.getItem(skill.name + "level") || "3");
    skill.load_details = () => {
        document.getElementById("skill-name").innerText = skill.name.toUpperCase()
        document.getElementById("skill-level").innerText = skill.getLevel().toString()
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
            skill.setLevel(skill.getLevel() + 1)
            document.querySelector("#skill-level").innerText = skill.getLevel().toString()
        }
        document.querySelector("#level-down-button").onclick = () => {
            skill.setLevel(skill.getLevel() - 1)
            document.querySelector("#skill-level").innerText = skill.getLevel().toString()
        }
        document.documentElement.style.setProperty('--content-scroll', 1);
    }
    skill.rep = (() => {
        var rep = document.createElement("div")
        rep = document.createElement("div")
        rep.className = "skill"
        image = document.createElement("img")
        image.src = "img/skill/" + skill.img
        rep.appendChild(image)
        label = document.createElement("div")
        label.className = "skill-label"
        title = document.createElement("p")
        title.innerHTML = skill.name.toUpperCase()
        label.appendChild(title)
        level_tick = document.createElement("p")
        level_tick.innerHTML = "&nbsp;" + level.toString() + "&nbsp;"
        label.appendChild(level_tick)
        rep.appendChild(label)
        rep.level_tick = level_tick
        modal = document.createElement("div")
        modal.className = "modal"
        modal.innerText = skill.desc_short
        rep.appendChild(modal)
        rep.onclick = () => skill.load_details()
        return rep
    })()
    skill.getLevel = () => level
    skill.setLevel = (l) => {
        level = l
        localStorage.setItem(skill.name + "level", l.toString())
        skill.rep.level_tick.innerHTML = "&nbsp;" + l.toString() + "&nbsp;"
    }
    return skill
})(skill_json)

for (var i = 0; i < Object.values(skills.intellect).length; i++) {
    document.getElementById("int").appendChild(Skill(Object.values(skills.intellect)[i]).rep)
}
for (var i = 0; i < Object.values(skills.psyche).length; i++) {
    document.getElementById("psy").appendChild(Skill(Object.values(skills.psyche)[i]).rep)
}
for (var i = 0; i < Object.values(skills.physique).length; i++) {
    document.getElementById("fys").appendChild(Skill(Object.values(skills.physique)[i]).rep)
}
for (var i = 0; i < Object.values(skills.motorics).length; i++) {
    document.getElementById("mot").appendChild(Skill(Object.values(skills.motorics)[i]).rep)
}
document.querySelector("#skill-details .closer").onclick = () => {
    // document.getElementById("skill-details").className = "closed"
    document.documentElement.style.setProperty('--content-scroll', 0);
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
