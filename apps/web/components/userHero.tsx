import { createClient } from "@/lib/supabase/server";
import UserHeroContent from "./userHeroContent";

const UserHero = async () => {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<div className="flex items-center gap-2 ml-auto">
			<UserHeroContent user={user} />
		</div>
	);
};

export default UserHero;