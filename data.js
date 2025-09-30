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

    simulerResultat(idMatch) {
        const match = this.getMatchById(idMatch);
        if (!match) {
            console.log(`Match avec l'ID ${idMatch} non trouvé.`);
            return null;
        }

        const random = Math.random();
        let gagnant;
        
        if (random < match.probabiliteA) {
            gagnant = match.equipeA;
        } else {
            gagnant = match.equipeB;
        }

        match.statut = 'Terminé';
        match.resultat = gagnant;

        console.log(`Match ${idMatch} simulé : ${gagnant} a gagné !`);
        return match;
    }

    getStatsEquipe(nomEquipe) {
        const matchsJoues = this.matchs.filter(match => 
            (match.equipeA === nomEquipe || match.equipeB === nomEquipe) && 
            match.statut === 'Terminé'
        );

        const nombreMatchs = matchsJoues.length;
        
        if (nombreMatchs === 0) {
            return {
                nomEquipe: nomEquipe,
                matchsJoues: 0,
                tauxVictoire: 0
            };
        }

        const victoires = matchsJoues.filter(match => match.resultat === nomEquipe).length;
        const tauxVictoire = (victoires / nombreMatchs) * 100;

        return {
            nomEquipe: nomEquipe,
            matchsJoues: nombreMatchs,
            tauxVictoire: Math.round(tauxVictoire * 100) / 100
        };
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

 console.log('--------------------------------');
 console.log('Simulation de matchs');
 console.log('--------------------------------');
 
 esportVision.simulerResultat('LFL_KC_SLY');
 esportVision.simulerResultat('VCT_VIT_M8');
 esportVision.simulerResultat('LFL_GO_BDS');
 esportVision.simulerResultat('LFL_KC_M8');

 console.log('--------------------------------');
 console.log('Statistiques des équipes');
 console.log('--------------------------------');
 
 console.log('Stats Karmine Corp:', esportVision.getStatsEquipe('Karmine Corp'));
 console.log('Stats Team Vitality:', esportVision.getStatsEquipe('Team Vitality'));
 console.log('Stats Gentle Mates:', esportVision.getStatsEquipe('Gentle Mates'));
 console.log('Stats Solary:', esportVision.getStatsEquipe('Solary'));
  
