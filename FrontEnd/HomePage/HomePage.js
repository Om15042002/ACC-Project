function smoothScroll() {
    document.getElementById("teamSection").scrollIntoView({
      behavior: "smooth",
    });
  }
  // Scroll animation for team members
  window.addEventListener("scroll", () => {
    const teamMembers = document.querySelectorAll(".team-member");
    teamMembers.forEach((member) => {
      const memberTop = member.getBoundingClientRect().top;
      const memberBottom = member.getBoundingClientRect().bottom;
      const screenPosition = window.innerHeight / 1.3;

      if (memberTop < screenPosition && memberBottom > 0) {
        member.style.opacity = "1";
        member.style.transform = "translateY(0)";
      }
    });
  });

  // Initial animation state
  document.querySelectorAll(".team-member").forEach((member) => {
    member.style.opacity = "0";
    member.style.transform = "translateY(50px)";
    member.style.transition =
      "all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
  });