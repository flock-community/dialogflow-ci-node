# language: nl
Functionaliteit: Voorbeeld
  Achtergrond:
    Stel ik begin een gesprek met de "Test" Google Home applicatie

  Scenario: Test
    Wanneer ik zeg "Hoe gaat het?"
    Dan begrijpt de assistente dat ik "Hoe gaat het" bedoel
    En ze vraagt "Waarom wil je dat weten"
    Als ik zeg "Nou, gewoon"
    Dan begrijpt ze dat ik de "Hoe gaat het - nou gewoon" intentie heb
    En de assistente zegt "Goed"
