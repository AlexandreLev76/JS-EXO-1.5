const calendrierMatchs = [
    {
      id: 'LFL_KC_SLY',
      jeu: 'League of Legends',
      competition: 'LFL',
      equipeA: 'Karmine Corp',
      equipeB: 'Solary',
      probabiliteA: 0.65, // 65% de chance pour KC
      statut: 'À venir'
    },
    {
      id: 'VCT_VIT_M8',
      jeu: 'Valorant',
      competition: 'VCT EMEA',
      equipeA: 'Team Vitality',
      equipeB: 'Mandatory',
      probabiliteA: 0.55, // 55% de chance pour Vitality
      statut: 'À venir'
    },
    {
      id: 'LFL_GO_BDS',
      jeu: 'League of Legends',
      competition: 'LFL',
      equipeA: 'Gentle Mates',
      equipeB: 'BDS Academy',
      probabiliteA: 0.48, // 48% de chance pour M8, donc BDS est favori
      statut: 'À venir'
    },
    {
      id: 'LFL_KC_M8',
      jeu: 'Valorant',
      competition: 'VCT EMEA',
      equipeA: 'Karmine Corp',
      equipeB: 'Mandatory',
      probabiliteA: 0.52,
      statut: 'À venir'
    }
  ];

  class Match {
    constructor(id, jeu, competition, equipeA, equipeB, probabiliteA, statut) {
        this.id = id;
        this.jeu = jeu;
        this.competition = competition;
        this.equipeA = equipeA;
        this.equipeB = equipeB;
        this.probabiliteA = probabiliteA;
        this.statut = statut;
    }

    getFavori() {
        return this.probabiliteA > 0.5 ? this.equipeA : this.equipeB;
    }
  }

  class Plateforme {
    constructor(nom, matchs = []) {
        this.nom = nom;
        this.matchs = matchs;
    }

    chargerMatchs(matchsACcharger) {
        matchsACcharger.forEach(matchData => {
            const match = new Match(
                matchData.id,
                matchData.jeu,
                matchData.competition,
                matchData.equipeA,
                matchData.equipeB,
                matchData.probabiliteA,
                matchData.statut
            );
            this.matchs.push(match);
        });
    }

    afficherCalendrier() {
        this.matchs.forEach(match => {
            console.log(`[${match.competition}] ${match.equipeA} vs. ${match.equipeB} - Jeu: ${match.jeu}`);
        });
    }

    getMatchsParJeu(jeu) {
        return this.matchs.filter(match => match.jeu === jeu);
    }

    getMatchsRisques() {
        return this.matchs.filter(match => match.probabiliteA >= 0.45 && match.probabiliteA <= 0.55);
    }

    getMatchById(id) {
        return this.matchs.find(match => match.id === id);
    }
  }

 const esportVision = new Plateforme('esportVision');
 esportVision.chargerMatchs(calendrierMatchs);
 esportVision.afficherCalendrier();
 console.log('--------------------------------');
 console.log('Matchs par jeu');
 console.log('--------------------------------');
 console.log(esportVision.getMatchsParJeu('League of Legends'));

 console.log('--------------------------------');
 console.log('Matchs risqués');
 console.log('--------------------------------');

 console.log(esportVision.getMatchsRisques());
 console.log('--------------------------------');
 console.log('Match par id');
 console.log('--------------------------------');
 console.log(esportVision.getMatchById('LFL_KC_SLY'));
  
  
