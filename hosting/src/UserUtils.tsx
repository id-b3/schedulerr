import { getDatabase, ref, get } from "firebase/database";

// Function to fetch user groups
const getUserGroups = async (userId) => {
  try {
    const db = getDatabase();
    const userGroupsRef = ref(db, `users/${userId}/groups`);
    const userGroupsSnapshot = await get(userGroupsRef);
    if (userGroupsSnapshot.val() != null) {
      const userGroups = userGroupsSnapshot.val();
      return Object.keys(userGroups).filter((groupKey) => userGroups[groupKey]);
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching user groups: ", error);
    return [];
  }
};

const getUserDates = async (userId) => {
        try {
            const db = getDatabase();
            const userDatesRef = ref(db, `users/${userId}/dates`);
            const userDatesSnapshot = await get(userDatesRef);
            if (userDatesSnapshot.val() != null) {
                return userDatesSnapshot.val();
                } else {
                        return [];
                    }
            } catch (error) {
                console.error("Error fetching user dates: ", error);
            }
    };

export { getUserGroups, getUserDates };
