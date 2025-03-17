import { FaLinkedin } from "react-icons/fa";
import { MagicCard } from './MagicCard';

const MemberCard = ({ member }) => {
  return (
    <MagicCard
      className="rounded-xl border border-gray-800 h-full"
      gradientFrom="#9E7AFF"
      gradientTo="#FE8BBB"
      gradientSize={150}
      gradientOpacity={0.5}
    >
      <div className="p-4 flex flex-col items-center h-full">
        <div className="w-20 h-20 rounded-full overflow-hidden mb-3 border-2 border-purple-500/20">
          <img
            src={member.profilePictureUrl}
            alt={`${member.name}'s profile`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center w-full">
          <h3 className="text-sm font-semibold">{member.name}</h3>
          <p className="text-purple-400 text-xs mt-0.5 mb-1">{member.title}</p>
          <p className="text-gray-400 text-xs mb-2 line-clamp-2">{member.bio}</p>
          {member.linkedinUrl && (
            <a
              href={member.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-pink-400 hover:text-pink-300 transition-colors text-xs"
            >
              <FaLinkedin className="text-sm" />
              <span>Connect</span>
            </a>
          )}
        </div>
      </div>
    </MagicCard>
  );
};

export default MemberCard; 