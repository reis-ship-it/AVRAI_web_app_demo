import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BookmarkCheck,
  CalendarDays,
  Check,
  ChevronRight,
  Clock,
  Coffee,
  Compass,
  GraduationCap,
  HeartHandshake,
  LucideIcon,
  MapPin,
  MessageCircle,
  Mountain,
  Music,
  RotateCcw,
  Route,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

type Screen = "welcome" | "onboarding" | "feed" | "detail";
type RecommendationType = "Event" | "Community" | "Place";
type VisualVariant =
  | "hike"
  | "study"
  | "coffee"
  | "volunteer"
  | "hangout"
  | "career"
  | "city";

type Profile = {
  university: string;
  year: string;
  major: string;
  minor: string;
  interests: string[];
  social: string[];
};

type Recommendation = {
  id: string;
  type: RecommendationType;
  title: string;
  description: string;
  detail: string;
  time: string;
  location: string;
  organizer: string;
  involved: string;
  bestFor: string;
  tags: string[];
  socialTags: string[];
  visual: VisualVariant;
  priority: number;
};

const initialProfile: Profile = {
  university: "UAB",
  year: "Freshman",
  major: "",
  minor: "",
  interests: [],
  social: [],
};

const years = ["Freshman", "Sophomore", "Junior", "Senior", "Transfer"];

const interestOptions = [
  "Academics & Study",
  "Arts & Culture",
  "Sports & Fitness",
  "Social & Fun",
  "Volunteering & Impact",
  "Outdoor Adventures",
  "Music",
  "Gaming",
  "Career & Startups",
  "Food & Coffee",
];

const socialOptions = [
  "Small, intimate groups",
  "Large campus events",
  "Local city discoveries",
  "Academic clubs",
  "Professional networking",
  "Just chill hangouts",
];

const recommendations: Recommendation[] = [
  {
    id: "ridgewalk",
    type: "Event",
    title: "Saturday Ridge Walk with UAB Outdoor Club",
    description:
      "A beginner-friendly morning walk with students who like fresh air, easy conversation, and low-pressure weekend plans.",
    detail:
      "Meet on campus, carpool with the club lead, and take a relaxed loop through a Birmingham overlook trail. The pace is intentionally easy so first-years and transfers can talk without feeling like they joined a race.",
    time: "Saturday, 9:30 AM",
    location: "Meet at Campus Green, walk at Red Mountain overlook",
    organizer: "UAB Outdoor Club",
    involved: "Outdoor Club hosts, two transfer mentors, and a small first-year group",
    bestFor: "Students who want a real reason to get outside and meet people without a party scene.",
    tags: ["Outdoor Adventures", "Sports & Fitness", "Social & Fun"],
    socialTags: ["Small, intimate groups", "Local city discoveries", "Just chill hangouts"],
    visual: "hike",
    priority: 10,
  },
  {
    id: "chem-study",
    type: "Event",
    title: "CH 115 Study Sprint at Sterne Library",
    description:
      "A focused two-hour review table for new students who want a reliable study group before the week gets loud.",
    detail:
      "Bring the problem set you are stuck on. A peer mentor opens with the three most missed concepts, then everyone works in pairs and leaves with a next-step plan.",
    time: "Tuesday, 6:00 PM",
    location: "Sterne Library, second floor collaboration tables",
    organizer: "UAB Peer Academic Support",
    involved: "Peer academic mentors and students from intro chemistry sections",
    bestFor: "Students who want community without pretending studying is not the main reason they showed up.",
    tags: ["Academics & Study", "Career & Startups"],
    socialTags: ["Academic clubs", "Small, intimate groups"],
    visual: "study",
    priority: 9,
  },
  {
    id: "open-mic",
    type: "Event",
    title: "Open Mic Night at June Coffee",
    description:
      "A mellow city-life pick for students who want music, poetry, and a reason to explore Birmingham beyond campus.",
    detail:
      "AVRAI picked this because it sits in the sweet spot between local culture and easy first outing. Arrive early, grab a table, and stay for short sets from student musicians and local performers.",
    time: "Thursday, 7:30 PM",
    location: "June Coffee, downtown Birmingham",
    organizer: "June Coffee community board",
    involved: "Local student musicians, Birmingham writers, and open mic regulars",
    bestFor: "Students who use social media to find scenes but would rather discover them in person.",
    tags: ["Music", "Arts & Culture", "Food & Coffee"],
    socialTags: ["Local city discoveries", "Just chill hangouts"],
    visual: "coffee",
    priority: 8,
  },
  {
    id: "railroad-volunteer",
    type: "Event",
    title: "Railroad Park Volunteer Morning",
    description:
      "A practical, feel-good way to meet students and locals while helping keep one of Birmingham's best public spaces inviting.",
    detail:
      "The group meets by the main lawn for light cleanup, planting, and coffee afterward. No experience needed, and the volunteer lead makes introductions at the start.",
    time: "Sunday, 10:00 AM",
    location: "Railroad Park, 17th Street Plaza entrance",
    organizer: "Birmingham Parks volunteer team",
    involved: "UAB students, neighborhood volunteers, and park staff",
    bestFor: "Students looking for purpose, fresh air, and a softer way into the city.",
    tags: ["Volunteering & Impact", "Outdoor Adventures", "Social & Fun"],
    socialTags: ["Local city discoveries", "Small, intimate groups"],
    visual: "volunteer",
    priority: 7,
  },
  {
    id: "board-game-lounge",
    type: "Community",
    title: "Low-Key Game Night at Hill Student Center",
    description:
      "A no-pressure table for board games, cozy strategy games, and meeting people without performing for a crowd.",
    detail:
      "Drop in for one round or stay for the whole night. The host keeps a beginner table open so nobody has to already know the rules or arrive with a group.",
    time: "Every Wednesday, 8:00 PM",
    location: "Hill Student Center, student lounge",
    organizer: "Blazer Gaming Guild",
    involved: "Casual gamers, tabletop hosts, and first-years looking for repeat hangouts",
    bestFor: "Students who want recurring community without the feed-scroll energy of social platforms.",
    tags: ["Gaming", "Social & Fun"],
    socialTags: ["Small, intimate groups", "Just chill hangouts"],
    visual: "hangout",
    priority: 6,
  },
  {
    id: "founder-friday",
    type: "Community",
    title: "First-Year Founder Friday",
    description:
      "A small meetup for curious students who want to talk ideas, internships, and early career moves without a formal networking vibe.",
    detail:
      "The group starts with a short founder story, then breaks into tiny conversation circles. AVRAI marked it as a strong fit for students who want professional momentum and real conversation.",
    time: "Friday, 4:00 PM",
    location: "Innovation Depot cafe area",
    organizer: "UAB Entrepreneurship Club",
    involved: "Student founders, club officers, and local startup mentors",
    bestFor: "Students who want career discovery to feel human, not transactional.",
    tags: ["Career & Startups", "Academics & Study"],
    socialTags: ["Professional networking", "Small, intimate groups"],
    visual: "career",
    priority: 5,
  },
  {
    id: "city-loop",
    type: "Place",
    title: "Your First Birmingham Saturday Loop",
    description:
      "A simple mini-route: coffee, park walk, lunch, and one campus-friendly stop that helps the city feel less unknown.",
    detail:
      "Start at Filter Coffee, walk through Railroad Park, grab lunch near 2nd Avenue, then come back toward campus before dinner. This is a safe, daytime route built for first city exploration.",
    time: "Best Saturday between 10:00 AM and 2:00 PM",
    location: "Downtown Birmingham loop, 10 minutes from campus",
    organizer: "AVRAI curated city guide",
    involved: "Student-tested places and easy walking directions",
    bestFor: "New students who want the city to feel usable without spending a whole day planning.",
    tags: ["Food & Coffee", "Arts & Culture", "Outdoor Adventures"],
    socialTags: ["Local city discoveries", "Just chill hangouts"],
    visual: "city",
    priority: 4,
  },
];

const visualIcons: Record<VisualVariant, LucideIcon> = {
  hike: Mountain,
  study: GraduationCap,
  coffee: Coffee,
  volunteer: HeartHandshake,
  hangout: Users,
  career: Compass,
  city: Music,
};

function scoreRecommendation(item: Recommendation, profile: Profile) {
  const interestScore = item.tags.filter((tag) => profile.interests.includes(tag)).length * 4;
  const socialScore = item.socialTags.filter((tag) => profile.social.includes(tag)).length * 3;
  const newcomerScore = profile.year === "Freshman" || profile.year === "Transfer" ? 2 : 0;

  return interestScore + socialScore + newcomerScore + item.priority / 100;
}

function fitLabel(item: Recommendation, profile: Profile) {
  const interestMatch = item.tags.find((tag) => profile.interests.includes(tag));
  const socialMatch = item.socialTags.find((tag) => profile.social.includes(tag));

  if (interestMatch && socialMatch) {
    return `${interestMatch} + ${socialMatch}`;
  }

  if (interestMatch) {
    return `Strong ${interestMatch} fit`;
  }

  if (socialMatch) {
    return `Matches ${socialMatch.toLowerCase()}`;
  }

  return "Good first-week starter";
}

function toggleSelection(value: string, selected: string[], max: number) {
  if (selected.includes(value)) {
    return selected.filter((item) => item !== value);
  }

  if (selected.length >= max) {
    return selected;
  }

  return [...selected, value];
}

function playPositiveFeedback() {
  if ("vibrate" in navigator) {
    navigator.vibrate?.(18);
  }

  const AudioContextConstructor =
    window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  const context = new AudioContextConstructor();
  const oscillator = context.createOscillator();
  const gain = context.createGain();

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(660, context.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(880, context.currentTime + 0.12);
  gain.gain.setValueAtTime(0.0001, context.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.08, context.currentTime + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.18);
  oscillator.connect(gain);
  gain.connect(context.destination);
  oscillator.start();
  oscillator.stop(context.currentTime + 0.2);
  window.setTimeout(() => void context.close(), 260);
}

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [profile, setProfile] = useState<Profile>(initialProfile);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);
  const [savedRecommendation, setSavedRecommendation] = useState<Recommendation | null>(null);
  const [toast, setToast] = useState("");

  const sortedRecommendations = useMemo(
    () =>
      [...recommendations].sort(
        (a, b) => scoreRecommendation(b, profile) - scoreRecommendation(a, profile),
      ),
    [profile],
  );

  function showToast(message: string) {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  }

  function openDetail(item: Recommendation) {
    setSelectedRecommendation(item);
    setScreen("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function saveRecommendation(item: Recommendation) {
    setSavedRecommendation(item);
    playPositiveFeedback();
    showToast(`${item.title} saved to My Week.`);
    setScreen("feed");
    setSelectedRecommendation(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetJourney() {
    setScreen("welcome");
    setOnboardingStep(0);
    setProfile(initialProfile);
    setSelectedRecommendation(null);
    setSavedRecommendation(null);
    setToast("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function finishStep() {
    if (onboardingStep < 3) {
      setOnboardingStep((step) => step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    setScreen("feed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main className="app">
      {screen === "welcome" && <WelcomeScreen onStart={() => setScreen("onboarding")} />}

      {screen === "onboarding" && (
        <OnboardingScreen
          profile={profile}
          step={onboardingStep}
          onBack={() => setOnboardingStep((current) => Math.max(0, current - 1))}
          onNext={finishStep}
          setProfile={setProfile}
        />
      )}

      {screen === "feed" && (
        <FeedScreen
          profile={profile}
          recommendations={sortedRecommendations}
          savedRecommendation={savedRecommendation}
          onOpenDetail={openDetail}
          onReset={resetJourney}
          onToast={showToast}
        />
      )}

      {screen === "detail" && selectedRecommendation && (
        <DetailScreen
          item={selectedRecommendation}
          profile={profile}
          onBack={() => setScreen("feed")}
          onSave={() => saveRecommendation(selectedRecommendation)}
          onToast={showToast}
        />
      )}

      <Toast message={toast} />
    </main>
  );
}

function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <section className="welcome-screen">
      <div className="brand-row" aria-label="AVRAI">
        <span className="brand-mark">A</span>
        <span>AVRAI</span>
      </div>
      <div className="welcome-copy">
        <p className="eyebrow">Built for new UAB students finding their people</p>
        <h1>Find the places, people, and plans that actually fit you.</h1>
        <p>
          AVRAI blends campus life and Birmingham city life into one personal discovery path, so
          your next good plan is not buried in a feed you never wanted.
        </p>
        <button className="primary-action" type="button" onClick={onStart}>
          <Sparkles size={20} aria-hidden="true" />
          Get Started
        </button>
      </div>
      <div className="welcome-signal" aria-label="Prototype focus">
        <span>UAB</span>
        <span>Birmingham</span>
        <span>Community</span>
      </div>
    </section>
  );
}

function OnboardingScreen({
  profile,
  step,
  setProfile,
  onBack,
  onNext,
}: {
  profile: Profile;
  step: number;
  setProfile: (profile: Profile) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const progress = ((step + 1) / 4) * 100;
  const canContinue =
    step === 0 ||
    step === 1 ||
    (step === 2 && profile.interests.length >= 3) ||
    (step === 3 && profile.social.length >= 1);

  return (
    <section className="flow-screen">
      <AppHeader label="Quick profile" />
      <div className="flow-shell">
        <div className="progress-row">
          <span>Step {step + 1} of 4</span>
          <div className="progress-track" aria-hidden="true">
            <div style={{ width: `${progress}%` }} />
          </div>
        </div>

        {step === 0 && (
          <div className="question-block">
            <p className="eyebrow">Campus context</p>
            <h2>Where are you starting from?</h2>
            <p className="supporting-copy">
              This keeps recommendations grounded in real campus timing and nearby city options.
            </p>
            <label className="field-label" htmlFor="university">
              University
            </label>
            <select
              id="university"
              value={profile.university}
              onChange={(event) => setProfile({ ...profile, university: event.target.value })}
            >
              <option value="UAB">University of Alabama at Birmingham</option>
            </select>
            <div className="option-grid year-grid">
              {years.map((year) => (
                <button
                  className={profile.year === year ? "option-button selected" : "option-button"}
                  key={year}
                  type="button"
                  onClick={() => setProfile({ ...profile, year })}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="question-block">
            <p className="eyebrow">Academic signal</p>
            <h2>What are you studying or exploring?</h2>
            <p className="supporting-copy">
              Leave the minor blank if you are undecided. AVRAI can still work with curiosity.
            </p>
            <label className="field-label" htmlFor="major">
              Major or intended major
            </label>
            <input
              id="major"
              value={profile.major}
              placeholder="Example: Biology, Computer Science, Marketing"
              onChange={(event) => setProfile({ ...profile, major: event.target.value })}
            />
            <label className="field-label" htmlFor="minor">
              Minor or side interest
            </label>
            <input
              id="minor"
              value={profile.minor}
              placeholder="Example: Music, Spanish, Entrepreneurship"
              onChange={(event) => setProfile({ ...profile, minor: event.target.value })}
            />
          </div>
        )}

        {step === 2 && (
          <div className="question-block">
            <p className="eyebrow">Discovery taste</p>
            <h2>Pick 3 to 5 interests that should shape your feed.</h2>
            <p className="supporting-copy">
              Selected interests will immediately affect the AVRAI recommendations.
            </p>
            <div className="option-grid">
              {interestOptions.map((interest) => (
                <button
                  className={profile.interests.includes(interest) ? "option-button selected" : "option-button"}
                  key={interest}
                  type="button"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      interests: toggleSelection(interest, profile.interests, 5),
                    })
                  }
                >
                  {interest}
                  {profile.interests.includes(interest) && <Check size={16} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <p className="selection-count">{profile.interests.length}/5 selected</p>
          </div>
        )}

        {step === 3 && (
          <div className="question-block">
            <p className="eyebrow">Social comfort</p>
            <h2>What kind of experience would feel worth leaving your room for?</h2>
            <p className="supporting-copy">Choose 1 to 3. This helps separate real fit from noise.</p>
            <div className="option-grid">
              {socialOptions.map((option) => (
                <button
                  className={profile.social.includes(option) ? "option-button selected" : "option-button"}
                  key={option}
                  type="button"
                  onClick={() =>
                    setProfile({
                      ...profile,
                      social: toggleSelection(option, profile.social, 3),
                    })
                  }
                >
                  {option}
                  {profile.social.includes(option) && <Check size={16} aria-hidden="true" />}
                </button>
              ))}
            </div>
            <p className="selection-count">{profile.social.length}/3 selected</p>
          </div>
        )}

        <div className="flow-actions">
          <button className="secondary-action" type="button" onClick={step === 0 ? () => undefined : onBack} disabled={step === 0}>
            <ArrowLeft size={18} aria-hidden="true" />
            Back
          </button>
          <button className="primary-action" type="button" onClick={onNext} disabled={!canContinue}>
            {step === 3 ? "Finish Profile" : "Continue"}
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}

function FeedScreen({
  profile,
  recommendations,
  savedRecommendation,
  onOpenDetail,
  onReset,
  onToast,
}: {
  profile: Profile;
  recommendations: Recommendation[];
  savedRecommendation: Recommendation | null;
  onOpenDetail: (item: Recommendation) => void;
  onReset: () => void;
  onToast: (message: string) => void;
}) {
  const primaryInterest = profile.interests[0] ?? "campus life";

  return (
    <section className="feed-screen">
      <AppHeader label="For You" />
      <div className="feed-hero">
        <div>
          <p className="eyebrow">AVRAI for {profile.university}</p>
          <h1>Your next good plan is already taking shape.</h1>
          <p>
            Ranked from your interests, your social comfort, and real UAB plus Birmingham context.
          </p>
        </div>
        <div className="profile-summary" aria-label="Profile summary">
          <span>{profile.year}</span>
          <span>{profile.major || "Exploring major"}</span>
          <span>{primaryInterest}</span>
        </div>
      </div>

      {savedRecommendation && (
        <section className="saved-panel" aria-live="polite">
          <div>
            <p className="eyebrow">Saved to My Week</p>
            <h2>{savedRecommendation.title}</h2>
            <p>
              This is the moment AVRAI is testing: one recommendation that feels specific enough to
              act on.
            </p>
          </div>
          <BookmarkCheck size={34} aria-hidden="true" />
        </section>
      )}

      <div className="section-heading">
        <div>
          <p className="eyebrow">Personalized picks</p>
          <h2>For the way you want to meet campus and the city</h2>
        </div>
        <button
          className="icon-text-button"
          type="button"
          onClick={() => onToast("Mock refresh complete. Your curated feed is already up to date.")}
        >
          <Sparkles size={18} aria-hidden="true" />
          Refresh fit
        </button>
      </div>

      <div className="recommendation-grid">
        {recommendations.map((item, index) => (
          <RecommendationCard
            key={item.id}
            item={item}
            rank={index + 1}
            profile={profile}
            onOpen={() => onOpenDetail(item)}
          />
        ))}
      </div>

      {savedRecommendation && (
        <section className="journey-end">
          <p className="eyebrow">Ready for another test run</p>
          <h2>Reset the prototype and try a different student profile.</h2>
          <button className="reset-action" type="button" onClick={onReset}>
            <RotateCcw size={22} aria-hidden="true" />
            Reset & Redo the Entire Journey
          </button>
        </section>
      )}
    </section>
  );
}

function RecommendationCard({
  item,
  rank,
  profile,
  onOpen,
}: {
  item: Recommendation;
  rank: number;
  profile: Profile;
  onOpen: () => void;
}) {
  return (
    <article className="recommendation-card">
      <RecommendationArt visual={item.visual} />
      <div className="card-content">
        <div className="card-topline">
          <span>{item.type}</span>
          <span>#{rank} fit</span>
        </div>
        <h3>{item.title}</h3>
        <p>{item.description}</p>
        <div className="fit-chip">
          <Sparkles size={15} aria-hidden="true" />
          {fitLabel(item, profile)}
        </div>
        <div className="meta-list">
          <span>
            <CalendarDays size={16} aria-hidden="true" />
            {item.time}
          </span>
          <span>
            <MapPin size={16} aria-hidden="true" />
            {item.location}
          </span>
        </div>
        <button className="card-action" type="button" onClick={onOpen}>
          View why it fits
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

function DetailScreen({
  item,
  profile,
  onBack,
  onSave,
  onToast,
}: {
  item: Recommendation;
  profile: Profile;
  onBack: () => void;
  onSave: () => void;
  onToast: (message: string) => void;
}) {
  return (
    <section className="detail-screen">
      <AppHeader label={item.type} />
      <button className="back-link" type="button" onClick={onBack}>
        <ArrowLeft size={18} aria-hidden="true" />
        Back to For You
      </button>
      <RecommendationArt visual={item.visual} large />
      <div className="detail-body">
        <div className="detail-title-row">
          <div>
            <p className="eyebrow">{fitLabel(item, profile)}</p>
            <h1>{item.title}</h1>
          </div>
          <span className="type-badge">{item.type}</span>
        </div>
        <p className="detail-description">{item.detail}</p>

        <div className="detail-facts">
          <InfoItem icon={Clock} label="When" value={item.time} />
          <InfoItem icon={MapPin} label="Where" value={item.location} />
          <InfoItem icon={Users} label="Who's involved" value={item.involved} />
          <InfoItem icon={HeartHandshake} label="Best for" value={item.bestFor} />
        </div>

        <section className="organizer-strip">
          <div>
            <p className="eyebrow">Organizer</p>
            <h2>{item.organizer}</h2>
          </div>
          <button
            className="icon-text-button"
            type="button"
            onClick={() => onToast("Organizer info is mocked for this test.")}
          >
            <MessageCircle size={18} aria-hidden="true" />
            Contact
          </button>
        </section>

        <div className="detail-actions">
          <button className="primary-action save-action" type="button" onClick={onSave}>
            <BookmarkCheck size={20} aria-hidden="true" />
            Save to My Week
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => onToast("Directions are mocked, but this is where a safe route would appear.")}
          >
            <Route size={18} aria-hidden="true" />
            Directions
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={() => onToast("Share link copied for prototype testing.")}
          >
            <Share2 size={18} aria-hidden="true" />
            Share
          </button>
        </div>
      </div>
    </section>
  );
}

function RecommendationArt({ visual, large = false }: { visual: VisualVariant; large?: boolean }) {
  const Icon = visualIcons[visual];

  return (
    <div className={large ? `art-scene art-${visual} large` : `art-scene art-${visual}`} aria-hidden="true">
      <span className="sun-disc" />
      <span className="cloud cloud-one" />
      <span className="cloud cloud-two" />
      <span className="hill hill-one" />
      <span className="hill hill-two" />
      <span className="path-line" />
      <Icon className="art-icon" size={large ? 58 : 42} strokeWidth={1.8} />
    </div>
  );
}

function InfoItem({ icon: Icon, label, value }: { icon: LucideIcon; label: string; value: string }) {
  return (
    <div className="info-item">
      <Icon size={19} aria-hidden="true" />
      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function AppHeader({ label }: { label: string }) {
  return (
    <header className="app-header">
      <div className="brand-row small">
        <span className="brand-mark">A</span>
        <span>AVRAI</span>
      </div>
      <span>{label}</span>
    </header>
  );
}

function Toast({ message }: { message: string }) {
  return (
    <div className={message ? "toast visible" : "toast"} role="status" aria-live="polite">
      <Check size={18} aria-hidden="true" />
      {message}
    </div>
  );
}

export default App;
