// Knowledge base data for RAG system
// This file contains the document corpus that will be searched

export interface KnowledgeDocument {
  id: string;
  title: string;
  content: string;
  tags: string[];
  sources?: string[];
}

// Sample knowledge base documents about relativity and light cones
export const knowledgeBase: KnowledgeDocument[] = [
  {
    id: "light-cones-intro",
    title: "Introduction to Light Cones",
    content: `
      Light cones are a fundamental concept in special relativity that help visualize the causal structure of spacetime. 
      A light cone represents all possible paths that light could take through spacetime from a specific event. 
      The concept was introduced by Hermann Minkowski in 1908 and divides spacetime into three regions: the future, 
      the past, and elsewhere (or spacelike separated).

      The light cone of an event consists of a future light cone and a past light cone. The future light cone contains 
      all events that could be influenced by the given event, while the past light cone contains all events that could 
      have influenced the given event. Events outside both light cones cannot have any causal relationship with the given 
      event because a signal would need to travel faster than light to connect them.
    `,
    tags: ["relativity", "light cones", "spacetime", "causality"],
    sources: ["Minkowski, H. (1908). Space and Time. Lecture delivered at the 80th Assembly of German Natural Scientists and Physicians."]
  },
  {
    id: "special-relativity",
    title: "Einstein's Special Relativity",
    content: `
      Special relativity is a physical theory developed by Albert Einstein in 1905. It introduces radical changes to our 
      understanding of space and time, replacing the Newtonian concepts of absolute space and time with a unified four-dimensional 
      spacetime continuum. The theory is built on two postulates:

      1. The laws of physics are the same for all observers in uniform motion relative to one another (the principle of relativity).
      2. The speed of light in vacuum is the same for all observers, regardless of their relative motion or the motion of the 
         light source (the invariance of the speed of light).

      From these postulates, several counterintuitive consequences emerge, such as time dilation (moving clocks run slower), 
      length contraction (moving objects become shorter), and the relativity of simultaneity (events simultaneous in one 
      reference frame may not be simultaneous in another). These effects become significant only at speeds approaching 
      the speed of light.
    `,
    tags: ["relativity", "Einstein", "speed of light", "spacetime"],
    sources: ["Einstein, A. (1905). On the Electrodynamics of Moving Bodies. Annalen der Physik, 17: 891-921."]
  },
  {
    id: "time-dilation",
    title: "Time Dilation in Relativity",
    content: `
      Time dilation is a core concept in Einstein's theory of relativity where time passes differently for observers in relative motion 
      or in different gravitational fields. According to special relativity, when an object moves relative to an observer, the observer 
      will measure time passing more slowly for the moving object. This effect becomes more pronounced as the object's speed approaches 
      the speed of light.

      The time dilation factor is given by the Lorentz factor: γ = 1/√(1-v²/c²), where v is the relative velocity and c is the speed of light.
      When v is close to c, γ becomes significantly greater than 1, meaning time passes much more slowly for the moving object.

      Time dilation has been experimentally verified using precise atomic clocks on airplanes and GPS satellites, which must account for 
      both special relativistic time dilation (due to motion) and general relativistic time dilation (due to gravitational potential differences).
    `,
    tags: ["time dilation", "relativity", "Lorentz factor", "speed of light"],
    sources: ["Hafele, J.C. & Keating, R.E. (1972). Around-the-World Atomic Clocks: Predicted Relativistic Time Gains. Science, 177: 166-168."]
  },
  {
    id: "light-cone-causality",
    title: "Light Cones and Causality",
    content: `
      Light cones enforce the principle of causality in relativity theory by defining the maximum possible causal influence an event 
      can have. The future light cone of an event contains all points in spacetime that could be reached by a signal or information 
      traveling from the event at or below the speed of light. Similarly, the past light cone contains all points in spacetime from 
      which a signal could have reached the event.

      Any event outside a given event's light cones is said to be "spacelike separated," meaning no causal relationship can exist between them 
      because they would require faster-than-light communication. This enforces the idea that cause must precede effect in all reference frames.

      The structure of light cones also illustrates how different observers can disagree about the simultaneity of events but never about 
      their causal ordering if the events are within each other's light cones.
    `,
    tags: ["light cones", "causality", "relativity", "spacetime"],
    sources: ["Hawking, S.W. & Ellis, G.F.R. (1973). The Large Scale Structure of Space-Time. Cambridge University Press."]
  },
  {
    id: "general-relativity",
    title: "General Relativity and Curved Spacetime",
    content: `
      General relativity, developed by Albert Einstein between 1907 and 1915, extends special relativity to incorporate gravity. 
      Rather than viewing gravity as a force acting across space, general relativity describes it as a curvature of spacetime caused 
      by mass and energy. This revolutionary perspective can be summarized by physicist John Wheeler's famous quote: "Spacetime tells 
      matter how to move; matter tells spacetime how to curve."

      In general relativity, the presence of mass or energy warps the fabric of spacetime, and this warping affects the paths of objects 
      moving through it. Objects follow the straightest possible paths (geodesics) through curved spacetime, which we perceive as gravitational 
      attraction. Light rays also follow geodesics, leading to phenomena like gravitational lensing and gravitational time dilation.

      Light cones in general relativity can be tilted or distorted by gravitational fields, which has profound implications for causality and 
      the global structure of spacetime. Near massive objects like black holes, light cones can be dramatically tilted inward, leading to the 
      event horizon—a boundary beyond which events cannot affect an outside observer.
    `,
    tags: ["general relativity", "curved spacetime", "gravity", "Einstein", "black holes"],
    sources: ["Einstein, A. (1915). The Field Equations of Gravitation. Proceedings of the Prussian Academy of Sciences."]
  },
  {
    id: "speed-light-limit",
    title: "Why Nothing Can Travel Faster Than Light",
    content: `
      The universal speed limit—the speed of light in vacuum (approximately 299,792,458 meters per second)—is a fundamental constant 
      in our universe. This limit is not simply a technological hurdle but a theoretical constraint arising from the structure of spacetime itself.

      According to special relativity, as an object with mass accelerates and approaches the speed of light, its relativistic mass increases 
      according to the formula m = m₀/√(1-v²/c²), where m₀ is the rest mass. This means that as v approaches c, the denominator approaches zero, 
      and the relativistic mass approaches infinity. Consequently, it would require infinite energy to accelerate an object with mass to the 
      speed of light, making this theoretically impossible.

      Furthermore, causality depends on this universal speed limit. If information could travel faster than light, it could, in some reference 
      frames, arrive before it was sent, creating causal paradoxes. Light cones visualize this constraint by defining the boundary of possible 
      causal influence.

      While nothing can travel through spacetime faster than light, spacetime itself can expand faster than light, as in cosmic inflation, 
      without violating relativity. Additionally, quantum entanglement allows for "spooky action at a distance," but it's been proven that 
      this phenomenon cannot be used to transmit information faster than light.
    `,
    tags: ["speed of light", "relativity", "causality", "light cones", "energy"],
    sources: ["Taylor, E.F. & Wheeler, J.A. (1992). Spacetime Physics: Introduction to Special Relativity. W.H. Freeman."]
  },
  {
    id: "black-holes-light-cones",
    title: "Black Holes and Light Cone Distortion",
    content: `
      Black holes represent the most extreme distortion of spacetime and light cones in our universe. At the event horizon of a black hole, 
      light cones are tilted so severely that all future-directed paths point inward toward the singularity. This means that once past the 
      event horizon, an object's future light cone—representing all possible paths it can take—contains only points leading further into the 
      black hole. No path exists that leads back outside, not even for light rays.

      This dramatic tilting of light cones illustrates why nothing, including light, can escape from within a black hole's event horizon. 
      It's not just that the escape velocity exceeds the speed of light—rather, the very structure of spacetime is altered such that there 
      are no future-directed paths leading outward.

      Near a rotating (Kerr) black hole, frame-dragging effects further complicate light cone structures, creating regions like the ergosphere 
      where spacetime itself is pulled around the black hole. In the theoretical interior of certain black holes, light cones might even allow 
      for closed timelike curves—paths through spacetime that return to their starting point in both space and time—though such exotic 
      configurations remain speculative.
    `,
    tags: ["black holes", "light cones", "event horizon", "general relativity", "singularity"],
    sources: ["Hawking, S. (1988). A Brief History of Time. Bantam Books."]
  },
  {
    id: "relativity-everyday",
    title: "Relativity in Everyday Technology",
    content: `
      While Einstein's theories of relativity might seem abstract, they have practical implications in technology we use daily. 
      Most notably, the Global Positioning System (GPS) relies on both special and general relativistic corrections to maintain its accuracy.

      GPS satellites orbit Earth at about 14,000 km/h, causing their clocks to tick slightly slower than identical clocks on Earth's surface 
      due to special relativistic time dilation. However, they also experience less gravitational time dilation because they're farther from 
      Earth's mass. The net effect is that satellite clocks run about 38 microseconds faster per day than Earth-based clocks.

      Without accounting for these relativistic effects, GPS positioning would accumulate errors of about 10 kilometers per day, rendering 
      the system useless for navigation. Engineers programmed GPS satellites to adjust for these time differences, making relativity essential 
      to accurate location services.

      Other technologies affected by relativistic considerations include particle accelerators, where particles moving near light speed 
      experience significant time dilation and mass increase, and certain precision instruments like atomic clocks used in standards laboratories.
    `,
    tags: ["relativity", "GPS", "time dilation", "technology", "practical applications"],
    sources: ["Ashby, N. (2003). Relativity in the Global Positioning System. Living Reviews in Relativity, 6: 1."]
  },
  {
    id: "tachyons-ftl",
    title: "Tachyons and Faster-Than-Light Travel: Science vs. Fiction",
    content: `
      Tachyons are hypothetical particles that would always travel faster than light. Unlike ordinary particles that cannot be accelerated 
      to light speed, tachyons would need to always move faster than light and would decelerate by gaining energy, rather than accelerating.

      While tachyons appear in some speculative physical theories, most physicists consider them impossible because their existence would 
      violate causality. If tachyons existed, they could be used to send information back in time in some reference frames, creating 
      grandfather paradoxes and other logical contradictions.

      In science fiction, tachyons are often invoked to justify faster-than-light (FTL) travel or communication. However, in real physics, 
      several theorems (such as the Tachyonic antitelephone argument) demonstrate that FTL information transfer would allow for time travel 
      paradoxes, strongly suggesting such particles cannot exist.

      Alternative possibilities for apparent FTL phenomena that don't violate causality include:
      - Quantum entanglement (which doesn't transmit usable information)
      - Wormholes (theoretical spacetime shortcuts)
      - Alcubierre drive (theoretical "warp bubble" that contracts spacetime ahead and expands it behind)

      All such alternatives either don't actually transmit information faster than light or require exotic forms of matter and energy that 
      may be physically impossible.
    `,
    tags: ["tachyons", "faster than light", "causality", "light cones", "science fiction"],
    sources: ["Feinberg, G. (1967). Possibility of Faster-Than-Light Particles. Physical Review, 159(5): 1089-1105."]
  },
  {
    id: "twin-paradox",
    title: "The Twin Paradox Explained",
    content: `
      The twin paradox is a thought experiment in special relativity that considers what happens when one of a pair of twins travels on a 
      high-speed journey to a distant star and back, while the other remains on Earth. According to time dilation, the traveling twin should 
      age more slowly and return younger than the Earth-bound twin.

      The apparent paradox arises when trying to analyze the situation from the traveler's perspective. Since motion is relative, couldn't 
      the traveling twin claim that they remained stationary while the Earth (and the other twin) moved away and then returned? If so, why 
      wouldn't the Earth-bound twin be the one who ages less?

      The resolution lies in recognizing that the twins' situations are not symmetrical. The traveling twin must change direction, which 
      involves acceleration and a shift between inertial reference frames. This acceleration breaks the symmetry of the problem. During the 
      turnaround, the traveling twin's reference frame changes instantaneously, causing a sudden jump in their perception of the Earth-bound 
      twin's age.

      When analyzed using light cones and proper time calculations, it becomes clear that the path through spacetime taken by the traveling 
      twin is shorter (in terms of proper time) than the path taken by the Earth-bound twin, unambiguously resulting in less aging for the 
      traveler.

      The twin paradox has been verified experimentally using precise atomic clocks on aircraft and satellites, confirming that moving clocks 
      do indeed tick more slowly in accordance with special relativity's predictions.
    `,
    tags: ["twin paradox", "time dilation", "relativity", "reference frames", "proper time"],
    sources: ["Lasky, R.C. (2006). Time and the Twin Paradox. Scientific American Special Edition on A Matter of Time, 16: 21-23."]
  }
];
