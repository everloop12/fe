const calculateLevelFromXP = (xp) => {
    if (xp < 100) {
        return 1; // If XP is less than 100, the level is 1.
    } else {
        let level = 1;
        let requiredXP = 100;

        while (xp >= requiredXP) {
            level++;
            requiredXP += (50 + 50 * level);
        }
        return level;
    }
}

export default calculateLevelFromXP