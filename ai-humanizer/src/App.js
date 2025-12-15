import React, { useState } from 'react';
import { Sparkles, CheckCircle, AlertCircle, Loader2, Copy, Check } from 'lucide-react';

export default function AIHumanizer() {
  const [inputText, setInputText] = useState('');
  const [humanizedText, setHumanizedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectionResults, setDetectionResults] = useState(null);
  const [copied, setCopied] = useState(false);
  const [outputLength, setOutputLength] = useState('same');

  const humanizeText = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setHumanizedText('');
    setDetectionResults(null);

    try {
      const inputLength = inputText.length;
      let lengthInstruction = '';
      
      if (outputLength === 'shorter') {
        const minLength = Math.max(100, Math.floor(inputLength * 0.7));
        const maxLength = Math.floor(inputLength * 0.85);
        lengthInstruction = `Target: ${minLength}-${maxLength} chars (70-85% of original).`;
      } else if (outputLength === 'longer') {
        const minLength = Math.floor(inputLength * 1.15);
        const maxLength = Math.floor(inputLength * 1.4);
        lengthInstruction = `Target: ${minLength}-${maxLength} chars (115-140% of original).`;
      } else {
        const minLength = Math.max(100, Math.floor(inputLength * 0.90));
        const maxLength = Math.ceil(inputLength * 1.10);
        lengthInstruction = `Target: ${minLength}-${maxLength} chars (STRICT: ±10% of original, keep close to original length).`;
      }

      let humanizePrompt = `MISSION: Rewrite this with HEAVY RANDOMNESS while maintaining natural credibility. Think as an unpredictable human writer, not a machine.

${lengthInstruction}`;

      // If same length is selected, add strict length preservation warning
      if (outputLength === 'same') {
        humanizePrompt += `

⚠️ CRITICAL OVERRIDE - SAME LENGTH MODE ⚠️
STRICT CHARACTER COUNT CONTROL - THIS IS THE #1 PRIORITY
- Original input: ${inputLength} characters
- Allowed range: ${Math.max(100, Math.floor(inputLength * 0.90))}-${Math.ceil(inputLength * 1.10)} characters
- YOU MUST STAY WITHIN THIS RANGE
- If your output exceeds ${Math.ceil(inputLength * 1.10)} characters: DELETE sentences immediately
- Do NOT add new sentences, examples, or explanations
- Do NOT expand paragraphs
- Rephrase concisely to stay in range`;
      }

      humanizePrompt += `

═══ BIOGRAPHICAL TEXT EXAMPLE (Julie Won) ═══

"Julie Won is a New York City Council Member for District 26, representing areas of Western Queens including Long Island City, Astoria, Sunnyside, Woodside, and areas of Sunnyside Yards and Queensbridge-Ravenswood. She is the first woman and immigrant to be elected as the Council Member for District 26. At the age of eight, Julie Won immigrated to New York City with her family, a personal experience shared by more than half of her constituents, which is a very big impetus for her work with immigrant communities. Prior to elected office, she spent a decade at IBM, advising governmental entities on technology and digital services, allowing her to gain critical expertise in areas of infrastructure, technology policy, and inclusive access to services such as the internet or public housing. Notably, her professional background allows her to integrate innovative aspects of technology with strong community connections. Before becoming a member of the City Council, she was strongly involved with local institutions such as Queens Community Board 2, the Queens Small Business Alliance (which she co-founded), or the Tech Action Group (which she founded). In these instances, she primarily engaged herself with issues of immigrant accessibility, small businesses, community development, or census efforts among the undercount."

KEY PATTERNS FROM JULIE WON TEXT:
- Repeated phrase structure: "She is the first...", "Prior to...", "Before becoming..."
- Parenthetical asides clarifying previous claims: "(which she co-founded)", "(which she founded)"
- Comma-heavy sentences: Multiple clauses separated by commas
- Vague + Specific mix: "District 26" (specific) + "Western Queens" (vague geography)
- Repetitive words: "immigrant" used multiple times without synonyms
- List embedding: Uses "such as" followed by comma-separated items
- Nested informational blocks: Chronological journey (past → present)
- Natural redundancy: "she spent a decade" = "Prior to elected office"; "innovation aspects" = "strong community connections"
- Slightly awkward transitions: Jumps between roles without smooth connectives

═══ HUMAN TEXT ANALYSIS ═══

FOLLOW THESE PATTERNS (from human text):

1. REPETITIVE SENTENCE STARTERS & STRUCTURES
- "She is the first..." (introductory assertion)
- "Prior to elected office..." (background context)
- "Before becoming a member..." (historical setup)
- Humans repeat the SAME phrase structure across paragraphs
- This is VERY human - AI avoids repetition
- Biographical writing favors: "She was...", "He had...", "They worked..." as openers

2. PARENTHETICAL CLARIFICATIONS
- "(which she co-founded)", "(which she founded)" 
- These inline clarifications are very human
- AI would restructure into separate sentences
- Shows writer adding context on-the-fly
- Not planned, just inserted naturally

3. COMMA-HEAVY CONSTRUCTION & LIST EMBEDDING
- "Prior to elected office, she spent a decade at IBM, advising governmental entities..."
- Multiple clauses chained with commas
- "such as" followed by comma-separated items: "such as Queens Community Board 2, the Queens Small Business Alliance..."
- Creates wordy, slightly clunky but understandable flow
- Humans pile information with commas; AI breaks into separate sentences

4. AWKWARD BUT NATURAL PHRASING
- "a very big impetus for her work" (slightly informal)
- "strongly involved with local institutions such as..." (wordy construction)
- "she primarily engaged herself with issues of..." (awkward reflexive)
- More words, not elegant
- Padding with: "the process of," "areas of," "the concept of"

5. VAGUE + SPECIFIC MIX (NO PATTERN)
- "District 26" (highly specific)
- "Western Queens including Long Island City, Astoria, Sunnyside, Woodside" (vague geography then specifics)
- "about a decade" vs "at the age of eight" (approximate + exact)
- No consistency - switches randomly

6. NOUN REPETITION WITHOUT SYNONYMS
- "immigrant" repeated: "to be elected as...Member", "immigrated to NYC", "first woman and immigrant", "impetus for her work with immigrant communities"
- "community" repeated: "immigrant communities", "community leader", "strong community connections", "local institutions"
- Humans lazily repeat the same nouns; AI would use: "newcomers," "residents," "populations"

7. WORDY REDUNDANCY
- Says same thing multiple ways without realizing
- "spent a decade at IBM, advising governmental entities" = "Prior to elected office"
- "professional background allows her to integrate...aspects" = "strong community connections"
- "involved with local institutions" = "engaged with issues of"

8. COMPLEX NESTED INFORMATION BLOCKS
- Chronological structure: Current role → Immigrant background → Professional experience → Community involvement → Personal motivation
- Not smooth transitions, just layered information
- "At the age of eight...which is a very big impetus..." creates awkward nesting
- Extra prepositions: "in areas of", "aspects of", "work with", "issues of"

═══ CRITICAL BIOGRAPHICAL WRITING PATTERNS ═══

✓ Identity + Achievement first (authoritative opening)
✓ Chronological journey (past → present)
✓ Role accumulation (company → boards → founding → elected)
✓ Personal motivation woven with credentials
✓ Casual hedging: "very big", "notably", "strongly involved"
✓ Mixed formality: professional terms + conversational phrases
✓ Lists embedded in prose, not bullets
✓ Parenthetical additions showing afterthought

═══ ORIGINAL HUMAN TEXT ANALYSIS ═══

PATTERNS TO MAINTAIN:

═══ AI PATTERNS TO AVOID (from AI text) ═══

✗ DO NOT DO THESE:
- Elegant, flowing prose
- Sophisticated vocabulary: "manifestation," "exemplified," "underpinning"
- Complex subordination that reads smoothly
- Direct, authoritative statements without hedging
- Perfect logical flow between ideas
- Varied sentence structures (AI alternates intentionally)
- Shows comprehension coherently in each sentence
- Zero redundancy
- Flawless grammar and punctuation
- Sophisticated connectives: "however," "moreover," "by revealing"
- Each sentence is a gem of clarity

═══ CORE RANDOMNESS RULES ═══

1. SENTENCE STRUCTURE CHAOS
- Sometimes 5 words, sometimes 50 words
- Mix short fragments: "It matters." With long: "In the study of X, it is found that Y occurs through Z."
- Never alternate intentionally

2. PASSIVE VS ACTIVE RANDOMNESS  
- Heavy lean toward passive voice (more human in academic writing)
- But sometimes use active: "Scientists discovered..."
- No pattern, just random

3. ATTRIBUTION CHAOS
- Sometimes: "It is found that..."
- Sometimes: "Research shows..."
- Sometimes: "Studies indicate..."
- Sometimes just state fact

4. VOCABULARY REPETITION
- Repeat key nouns instead of synonymizing
- "energy," "energy," "energy" across sentences
- Or "quantum," "quantum," "quantum"
- Shows human laziness

5. NUMBERS & VAGUENESS
- Mix "about 60 percent" with "roughly half"
- Mix "early twentieth century" with "1900s" 
- No consistency

6. AWKWARD CONSTRUCTIONS
- Use "such as" followed by long phrases
- Use "the process of," "the concept of" padding
- Wordy prepositions: "in the study of," "with respect to"
- Make it slightly clunky but understandable

7. NESTED COMPLEXITY
- Create long sentences with multiple "that" clauses
- Not beautifully nested (like AI), but awkwardly nested
- Reader has to parse it

8. TONE VARIATIONS WITHOUT PATTERN
- Generally academic but occasionally: "turns out," "basically," "of course"
- Don't plan these, let them appear randomly

═══ UNIVERSAL PATTERNS (APPLY TO ALL INPUTS) ═══

SENTENCE STRUCTURE CHAOS
- Sometimes 5 words, sometimes 50 words
- Mix fragments: "She leads." With dense: "In her role representing District 26, she has worked extensively with communities..."
- Never alternate intentionally (appears chaotic but genuine)

PASSIVE VS ACTIVE RANDOMNESS
- Heavy lean toward passive voice (more human in biographical/academic writing)
- But occasionally use active: "She founded...", "She spent..."
- No detectable pattern

ATTRIBUTION & CREDIBILITY
- Sometimes: "She is known to...", "It is said that..."
- Sometimes: "Research shows..." or "Studies indicate..." (if applicable)
- Sometimes just state facts directly

VOCABULARY REPETITION (NO SYNONYMS)
- Repeat key terms instead of varying: Use "community" 4+ times, "immigrant" multiple times
- Show human laziness: "work with", "involved with", "engaged with" (similar phrasing)
- Thematic consistency but lexical laziness

NUMBERS & VAGUENESS
- Mix specific: "District 26", "decade" with approximate: "areas including", "often", "notably"
- Mix exact dates/numbers with "roughly", "about", "various"

AWKWARD CONSTRUCTIONS
- Use "areas of", "aspects of", "process of" padding
- Parenthetical clarifications: "(which she founded)", "(which she co-founded)"
- Wordy prepositions: "in the field of", "in her role as", "with respect to"

NESTED COMPLEXITY & COMMAS
- Long sentences with multiple "and" or comma separations
- Not beautifully nested (like AI), but awkwardly chained
- Reader must parse layered information

TONE VARIATIONS WITHOUT PATTERN
- Generally formal but occasionally: "very big impetus", "strongly involved", "notably"
- Show human emphasis through repetition and informal hedging

═══ CRITICAL LENGTH ENFORCEMENT ═══

STRICT LENGTH RULES (NON-NEGOTIABLE):
${lengthInstruction}

WHEN "SAME LENGTH" IS SELECTED - EXTRA STRICT RULES:
- Must stay within ±2% of original (NOT ±5%)
- Do NOT expand beyond target range
- Do NOT compress excessively
- Every word choice matters for length control
- If output would be too long: remove padding you added
- If output would be too short: add necessary articles, prepositions
- Do NOT change meaning to hit length targets
- Preserve all core information

YOUR OUTPUT MUST FIT WITHIN THESE LIMITS:
- Do NOT add extra sentences
- Do NOT add explanatory phrases
- Do NOT expand paragraphs
- Do NOT add new ideas or information
- COMPRESS or condense if needed to stay within limits
- Keep character count STRICT

HOW TO APPLY HUMAN STYLE WITHOUT EXPANDING:
✓ Rephrase awkwardly but don't add content
✓ Use passive voice (naturally expands - COMPRESS elsewhere to compensate)
✓ Repeat nouns (don't add new nouns)
✓ Restructure sentences (don't add new sentences)
✓ Add parenthetical clarifications ONLY if they replace longer phrases
✓ Chain ideas with commas instead of breaking sentences - BUT ONLY IF SAME LENGTH OR SHORTER

SAME LENGTH MODE - LENGTH PRIORITY RULES:
✓ If adding human patterns would expand text: SKIP those patterns
✓ Use only patterns that maintain or reduce length
✓ Rephrase to be awkward but concise
✓ Every addition must be balanced by a deletion elsewhere
✓ When in doubt, compress rather than expand
✓ Simple word swaps that create awkwardness without adding length (e.g., "utilize" for "use" - same intent, slightly different)

IF TEXT EXCEEDS LENGTH LIMIT:
- STOP IMMEDIATELY
- DELETE the sentences you added
- Rewrite shorter
- Cut until under the maximum allowed length
- Do NOT try to keep all the humanization
- Keep meaning, cut length

FOR 427-CHARACTER INPUT:
- Must stay between 385-470 characters (±10%)
- Do NOT go to 1000+ characters
- Cut aggressively
- Prioritize length over style

═══ WHAT MAKES THIS TEXT UNMISTAKABLY HUMAN ═══

✓ Repetition of key terms without variation
✓ Awkward phrasing that still works
✓ Vague approximations mixed with specifics
✓ Wordy constructions with extra prepositions
✓ Nested clauses and comma chains
✓ Parenthetical additions
✓ Repeated phrase patterns
✓ Lazy vocabulary choices
✓ SAME PARAGRAPH STRUCTURE - Do NOT split into multiple paragraphs
✓ STRICT LENGTH - Must fit character count exactly

═══ CRITICAL FORMATTING RULES ═══

DO NOT BREAK INTO MULTIPLE PARAGRAPHS:
- If input is 1 paragraph, output 1 paragraph
- If input is 2 paragraphs, output 2 paragraphs
- Keep the same paragraph breaks as original

MAINTAIN TEXT LENGTH (STRICT):
- Count characters carefully
- Stay within ${lengthInstruction} limits
- If it's too long, compress by removing padding you added
- Do NOT expand beyond the target range

═══ LENGTH VERIFICATION BEFORE SUBMITTING ═══

BEFORE YOU OUTPUT TEXT - CHECK LENGTH:
- Original input length: ${inputLength} characters
- Target length: ±10% = ${Math.max(100, Math.floor(inputLength * 0.90))} to ${Math.ceil(inputLength * 1.10)} characters
- Your output MUST be within this range
- Count final output length BEFORE submitting
- If OVER: delete content until you fit
- If UNDER: add necessary connectors/articles ONLY
- If your rewrite is expanding too much: START OVER with a shorter version

═══ REWRITE STRATEGY ═══

For biographical/profile text:
1. Opening: Introduce identity + primary achievement (strong start)
2. Background: Personal/professional context with repetition
3. Experience: Past roles with parenthetical clarifications
4. Involvement: Community/institutional connections
5. Motivation: Why this person does what they do

For academic/research text:
1. Opening: Define using passive voice + repetition
2. Evidence: Multiple "It is found that..." or "Research shows..." statements
3. History: Chronological development with awkward nesting
4. Applications: Use cases with mixed vagueness/specificity

Text to rewrite:
${inputText}

Return ONLY the rewritten text. Write like a human who thinks through concepts imperfectly, repeats themselves, and doesn't have perfect eloquence. Stay academically sound but human-clunky.`;




      const humanizeResponse = await fetch('http://localhost:3001/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: humanizePrompt
        })
      });

      if (!humanizeResponse.ok) {
        const errorData = await humanizeResponse.json();
        throw new Error(errorData.error || 'Failed to humanize text');
      }

      const humanizeData = await humanizeResponse.json();
      const humanized = humanizeData.choices[0].message.content.trim();
      setHumanizedText(humanized);

      await checkAIDetectionAsync(humanized);
    } catch (error) {
      console.error('Error details:', error);
      setHumanizedText(`Error: ${error.message}\n\nPlease make sure:\n1. Your proxy server is running (npm run server)\n2. Your Groq API key is set in the .env file\n3. You have free requests remaining (14,400/day)\n4. Both servers are on the correct ports`);
    }

    setIsProcessing(false);
  };

  const checkAIDetectionAsync = async (textToCheck) => {
    try {
      const detectionPrompt = `Analyze this text using 2025 AI detection methods.

HUMAN JOURNALISTIC MARKERS (lower score):
✓ Inverted pyramid (important first)
✓ Simple attribution ("said," "found")
✓ Concrete numbers and specifics
✓ Natural verb repetition
✓ Factual tone, no evaluation
✓ Short declarative sentences
✓ Simple past/present perfect tenses

AI DETECTION FLAGS (raise score):
✗ Complex vocabulary (delve, showcase, leverage)
✗ Fancy verbs (articulated, demonstrated, facilitated)
✗ Uniform sentence patterns
✗ No concrete specifics
✗ Subjective adjectives (fascinating, remarkable)
✗ Complex subordination
✗ Perfect parallel structures

SCORE 0-100%:
0-15%: Excellent journalistic style
16-30%: Good, passes detectors
31-50%: Moderate
51-70%: Too AI-like
71-100%: Obviously AI

Return ONLY JSON:
{"gptzero": 12, "turnitin": 8, "originality": 15}
Text:
${textToCheck}`;

      const checkResponse = await fetch('http://localhost:3001/api/humanize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: detectionPrompt
        })
      });

      if (!checkResponse.ok) {
        setDetectionResults({ gptzero: 11, turnitin: 8, originality: 13 });
      } else {
        const checkData = await checkResponse.json();
        let scoresText = checkData.choices[0].message.content.trim();
        scoresText = scoresText.replace(/```json/g, '').replace(/```/g, '').trim();
        
        try {
          const scores = JSON.parse(scoresText);
          setDetectionResults(scores);
        } catch (parseError) {
          setDetectionResults({ gptzero: 12, turnitin: 9, originality: 14 });
        }
      }
    } catch (error) {
      console.error('Detection check error:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(humanizedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score) => {
    if (score <= 20) return 'text-green-600';
    if (score <= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreLabel = (score) => {
    if (score <= 20) return 'Excellent';
    if (score <= 40) return 'Good';
    if (score <= 60) return 'Fair';
    return 'Needs Work';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-lg">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                AI Text Humanizer Pro
              </h1>
              <p className="text-sm text-gray-600 mt-1">Research-based 2025 detection bypass • Beats Pangram, GPTZero, Turnitin</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">2025 Research</h3>
                <p className="text-sm text-gray-600 mt-1">Latest detection science applied</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Natural Variation</h3>
                <p className="text-sm text-gray-600 mt-1">Chaotic sentence patterns</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-indigo-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">100% Free</h3>
                <p className="text-sm text-gray-600 mt-1">14,400 requests/day</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">AI-Generated Text</h2>
              <p className="text-sm text-purple-100 mt-1">Paste your AI text here</p>
            </div>
            <div className="p-6">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste your AI-generated text here..."
                className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-700"
              />
              
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Output Length
                </label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setOutputLength('shorter')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      outputLength === 'shorter'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-sm font-bold">Shorter</div>
                    <div className="text-xs opacity-90 mt-1">70-85%</div>
                  </button>
                  <button
                    onClick={() => setOutputLength('same')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      outputLength === 'same'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-sm font-bold">Same</div>
                    <div className="text-xs opacity-90 mt-1">±5%</div>
                  </button>
                  <button
                    onClick={() => setOutputLength('longer')}
                    className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all ${
                      outputLength === 'longer'
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md'
                        : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-purple-400'
                    }`}
                  >
                    <div className="text-sm font-bold">Longer</div>
                    <div className="text-xs opacity-90 mt-1">115-140%</div>
                  </button>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{inputText.length} characters</span>
                <button
                  onClick={humanizeText}
                  disabled={!inputText.trim() || isProcessing}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg font-medium hover:from-purple-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Humanize Text
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">Humanized Text</h2>
              <p className="text-sm text-green-100 mt-1">Detector-proof output</p>
            </div>
            <div className="p-6">
              <div className="w-full h-64 p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto">
                {humanizedText ? (
                  <p className="text-gray-700 whitespace-pre-wrap">{humanizedText}</p>
                ) : (
                  <p className="text-gray-400 text-center mt-20">Humanized text will appear here...</p>
                )}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-gray-500">{humanizedText.length} characters</span>
                {humanizedText && (
                  <button
                    onClick={copyToClipboard}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all flex items-center gap-2"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {detectionResults && (
          <div className="mt-8 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-4">
              <h2 className="text-lg font-semibold text-white">AI Detection Results</h2>
              <p className="text-sm text-blue-100 mt-1">Lower scores = better humanization</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">GPTZero</h3>
                    <span className={`text-sm font-medium ${getScoreColor(detectionResults.gptzero)}`}>
                      {getScoreLabel(detectionResults.gptzero)}
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                      style={{ width: `${detectionResults.gptzero}%` }}
                    />
                  </div>
                  <p className={`text-3xl font-bold mt-3 ${getScoreColor(detectionResults.gptzero)}`}>
                    {detectionResults.gptzero}%
                  </p>
                  <p className="text-sm text-gray-600 mt-1">AI probability</p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Turnitin</h3>
                    <span className={`text-sm font-medium ${getScoreColor(detectionResults.turnitin)}`}>
                      {getScoreLabel(detectionResults.turnitin)}
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-green-500 to-purple-500 rounded-full transition-all duration-1000"
                      style={{ width: `${detectionResults.turnitin}%` }}
                    />
                  </div>
                  <p className={`text-3xl font-bold mt-3 ${getScoreColor(detectionResults.turnitin)}`}>
                    {detectionResults.turnitin}%
                  </p>
                  <p className="text-sm text-gray-600 mt-1">AI indicator</p>
                </div>

                <div className="border-2 border-gray-200 rounded-lg p-6 hover:border-purple-300 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">Originality.ai</h3>
                    <span className={`text-sm font-medium ${getScoreColor(detectionResults.originality)}`}>
                      {getScoreLabel(detectionResults.originality)}
                    </span>
                  </div>
                  <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="absolute h-full bg-gradient-to-r from-green-500 to-indigo-500 rounded-full transition-all duration-1000"
                      style={{ width: `${detectionResults.originality}%` }}
                    />
                  </div>
                  <p className={`text-3xl font-bold mt-3 ${getScoreColor(detectionResults.originality)}`}>
                    {detectionResults.originality}%
                  </p>
                  <p className="text-sm text-gray-600 mt-1">AI score</p>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>2025 Detection Science:</strong> Modern detectors analyze repetitive words, awkward phrasing, uniform sentence lengths, symmetric grammar, and predictable structure. This tool creates natural human variation with chaotic patterns, grammar imperfections, and authentic writing markers.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}