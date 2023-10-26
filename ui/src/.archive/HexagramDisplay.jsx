import React, { useState, useEffect } from 'react';

// Define a dictionary to map binary values to Unicode characters
const hexagramDictionary = {
  '111111': {
    unicode: '䷀',
    number: '01',
    name: '乾',
    englishName: 'Initiating',
    judgement: `Vast is the 'great and originating power' indicated by Ch'ien! All things owe to it their beginning: it contains all the meanings belonging to the name heaven. The clouds move and the rain is distributed; the various things appear in their developed forms. The sages grandly understand the connection between the end and the beginning, and how the indications of the six lines in the hexagram are accomplished, each in its season. Accordingly they mount the carriage drawn by those six dragons at the proper times, and drive through the sky. The method of Ch'ien is to change and transform, so that everything obtains its correct nature as appointed by the mind of Heaven; and thereafter the conditions of great harmony are preserved in union. The result is 'what is advantageous, and correct and firm.' The sage appears aloft, high above all things, and the myriad states all enjoy repose. Heaven in its motion, gives the idea of strength. The superior man, in accordance with this, nerves himself to ceaseless activity.`,  // Using template literals for multiline strings
  },
  '000000': {
    unicode: '䷁',
    number: '02',
    name: '坤',
    englishName: 'Responding',
    judgement: `Complete is the great and originating capacity indicated by K'un! All things owe to it their birth; it receives obediently the influences of Heaven. K'un, in its largeness, supports and contains all things. Its excellent capacity matches the unlimited power of Ch'ien. Its comprehension is wide, and its brightness great. The various things obtain by it their full development. The mare is a creature of earthly kind. Its power of moving on the earth is without limit; it is mild and docile, advantageous and firm: such is the course of the superior man. If he take the initiative, he goes astray: he misses, that is, his proper course. If he follow, he is docile, and gets into his regular course. In the southwest he will get friends: he will be walking with those of his own class. In the northeast he will lose friends: but in the end there will be ground for congratulation. The good fortune arising from resting in firmness corresponds to the unlimited capacity of the earth. The capacity and sustaining power of the earth is what is denoted by K'un. The superior man, in accordance with this, with his large virtue supports men and things.`,  // Using template literals for multiline strings
  },
  '010001': {
    unicode: '䷂',
    number: '03',
    name: '屯',
    englishName: 'Beginning',
    judgement: `In Chun we have the strong Ch'ien and the weak K'un commencing their intercourse, and difficulties arising. Movement in the midst of peril gives rise to great progress and success, through firm correctness. By the action of the thunder and rain, which are symbols of Chên and K'an, all between Heaven and Earth is filled up. But the condition of the time is full of irregularity and obscurity. Feudal princes should be established, but the feeling that rest and peace have been secured should not be indulged even then. The trigram representing clouds and that representing thunder form Chun. The superior man, in accordance with this, adjusts his measures of government as in sorting the threads of the warp and woof.`,  // Using template literals for multiline strings
  },
  '100010': {
    unicode: '䷃',
    number: '04',
    name: '蒙',
    englishName: 'Childhood',
    judgement: `In Mêng we have the trigram for a mountain, and below it that of a rugged defile with a stream in it. The conditions of peril and arrest of progress suggested by these give the idea in Mêng. Mêng indicates that there will be progress and success: for there is development at work in it, and its time of action is exactly what is right. 'I do not seek the youthful and inexperienced; he seeks me:' so does will respond to will. When he shows the sincerity that marks the first recourse to divination, I instruct him: for possessing the qualities of the undivided line and being in the central place, the subject of the second line thus speaks. A second and third application create annoyance, and I do not instruct so as to create annoyance, annoyance he means to the ignorant. The method of dealing with the young and ignorant is to nourish the correct nature belonging to them; this accomplishes the service of the sage. The trigram representing a mountain, and beneath it that for a spring issuing forth from Mêng. The superior man, in accordance with this, strives to be resolute in his conduct and nourishes his virtue.`,  // Using template literals for multiline strings
  },
  '010111': {
    unicode: '䷄',
    number: '05',
    name: '需',
    englishName: 'Needing',
    judgement: `Hsu denotes waiting. The figure shows peril in front; but notwithstanding the firmness and strength indicated by the inner trigram, its subject does not allow himself to be involved in the dangerous defile: it is right he should not be straightened or reduced to extremity. When it is said that, with the sincerity declared in Hsu, there will be brilliant success, and with firmness there will be good fortune, this is shown by the position of the fifth line in the place assigned by Heaven, and its being the correct position for it, and in the centre. It will be advantageous to go through the great stream; that is, going forward will be followed by meritorious achievement. The trigram for clouds ascending over that for the sky forms Hsu. The superior man, in accordance with this, eats and drinks, feasts and enjoys himself as if there were nothing else to employ him.`,  // Using template literals for multiline strings
  },
  '111010': {
    unicode: '䷅',
    number: '06',
    name: '訟',
    englishName: 'Contention',
    judgement: `The upper portion of Sung is the trigram representing strength and the lower that representing peril. The coming together of strength and peril gives the idea in Sung. Sung intimates how, though there is sincerity in one's contention, he will yet meet with opposition and obstruction; but if he cherish and apprehensive caution, there will be good fortune. A strong line has come and got the central place in the lower trigram. If he must presecute the contention to the bitter end, there will be evil; contention is not a thing to be carried on to extremity. It will be advantageous to meet with the great man; what he sets a value on is the due mean, and the correct place. It will not be advantageous to cross the great stream; one attempting to do so would find himself in an abyss. The trigram representing heaven and that representing water, moving away from each other, form Sung. The superior man, in accordance with this, in the transaction of affairs takes good counsel about his first steps.`,  // Using template literals for multiline strings
  },
  '000010': {
    unicode: '䷆',
    number: '07',
    name: '師',
    englishName: 'Multitude',
    judgement: `The name Shih describes the multitude of the host. The firmness and correctness which the hexagram indicates refer to more correctness of aim. When the mover is able to use the multitude with such correctness, he may attain to the royal sway. There is the symbol of strength in the centre of the trigram below, and it is responded to by its proper correlate above. The action gives rise to perils, but it is in accordance with the best sentiments of men. Its mover may by such action distress all the country, but the people will follow him: there will be good fortune, and what error should there be? The trigram representing the earth and in the midst of it that representing water, form Shih. The superior man, in accordance with this, nourishes and educates the people, and collects from among them the multitudes of the host.`,  // Using template literals for multiline strings
  },
  '010000': {
    unicode: '䷇',
    number: '08',
    name: '比',
    englishName: 'Union',
    judgement: `Pi indicates that there is good fortune: the name Pi denotes help; and we see in the figure inferiors docilely following their superior. Let the principal party intended in it reexamine himself, as if by divination, whether his virtue be great, unintermitting, and firm; if it be so, there will be no error: all this follows from the position of the strong line in the centre of the upper trigram. Those who have no rest will come to him: high and low will respond to its subject. With those who are too late in coming it will be ill: for them the way of good fortune here indicated has been exhausted. The trigram representing the earth, and over it that representing water, for Pi. The ancient kings, in accordance with this, established the various states and maintained an affectionate relation to their princes.`,  // Using template literals for multiline strings
  },
  '110111': {
    unicode: '䷈',
    number: '09',
    name: '小畜',
    englishName: 'Little Accumulation',
    judgement: `In Hsiao Ch'u the weak line occupies its proper position, and the lines above and below respond to it. Hence come the name of Hsiao Ch'u, Small Restraint. It presents the symbols of strength and flexibility. Strong lines are in the central places, and the will of their subjects will have free course. Thus it indicates that there will be progress and success. Dense clouds but no rain indicate the movement of the strong lines still going forward. The Commencing at our western border indicates that the beneficial influence has not yet been widely displayed. The trigram representing the sky, and that representing wind moving above it, form Hsiao Ch'u. The superior man, in accordance with this, adorns the outward manifestation of his virtue.`,  // Using template literals for multiline strings
  },
  '111011': {
    unicode: '䷉',
    number: '10',
    name: '履',
    englishName: 'Fulfillment',
    judgement: `In Lu we have the symbol of weakness treading on that of strength. The lower trigram indicates pleasure and satisfaction, and responds to the upper indicating strength. Hence it is said, he treads on the tail of a tiger, which does not bite him; there will be progress and success. The fifth line is strong, in the centre, and in its correct place. Its subject occupies the God given position, and falls into no distress or failure; his action will be brilliant. The trigram representing the sky above, and below it that representing the waters of a marsh, form Lu. The superior man in accordance with this discriminates between high and low, and gives settlement to the aims of the people.`,  // Using template literals for multiline strings
  },
  '000111': {
    unicode: '䷊',
    number: '11',
    name: '泰',
    englishName: 'Advance',
    judgement: `The little come and the great gone in T'ai, and its indication that there will be good fortune with progress and success show to us heaven and earth in communication with each other, and all things in consequence having free course, and also the high and the low, superiors and inferiors, in communication with one another, and possessed by the same aim. The inner trigram is made up of the strong and undivided lines, and the outer of the weak and divided; the inner is the symbol of strength, and the outer of docility; the inner represents the superior man and the outer the small man. Thus the way of the superior man appears increasing, and that of the small man decreasing. The trigrams for heaven and earth in communication together form T'ai. The sage sovereign, in harmony with this, fashions and completes his regulations after the courses of heaven and earth, and assists the application of the adaptations furnished by them, in order to benefit the people.`,  // Using template literals for multiline strings
  },
  '111000': {
    unicode: '䷋',
    number: '12',
    name: '否',
    englishName: 'Hindrance',
    judgement: `The want of good understanding between the different classes of men in P'i and its indication as unfavorable to the firm and correct course of the superior man; with the intimation that the great are gone and the little come: all this springs from the fact that in it heaven and earth are not in communication with each other, and all things in consequence do not have free course; and that the high and the low (superiors and inferiors) are not in communication with one another, and there are no well-regulated states under the sky. The inner trigram is made up of the weak and divided lines, and the outer of the strong and undivided: the inner is the symbol of weakness, and the outer of strength; the inner represents the small man, and the outer the superior man. Thus the way of the small man appears increasing, and that of the superior man decreasing. The trigrams of heaven and earth, not in intercommunication, form P'i. The superior man, in accordance with this, restrains the manifestation of his virtue, and avoids the calamities that threaten him. There is no opportunity of conferring on him the glory of emolument.`,  // Using template literals for multiline strings
  },
  '111101': {
    unicode: '䷌',
    number: '13',
    name: '同人',
    englishName: 'Seeking Harmony',
    judgement: `In T'ung Jên the weak line has the place of influence, the central place, and responds to the corresponding line in Ch'ien (above); hence comes its name of T'ung Jên (or Union of Men). T'ung Jên says: The language, T'ung Jên appears here as we find it in the remote districts of the country, indicating progress and success, and that it will be advantageous to cross the great stream, is moulded by its containing the strength symbolled in Ch'ien. Then we have the trigram indicating elegance and intelligence, supported by that indicating strength; with the line in the central, and its correct, position, and responding to the corresponding line above: all representing the correct course of the superior man. It is only the superior man who can comprehend and affect the minds of all under the sky. The trigrams for heaven and fire form T'ung Jên. The superior man, in accordance with this, distinguishes things according to their kinds of classes.`,  // Using template literals for multiline strings
  },
  '101111': {
    unicode: '䷍',
    number: '14',
    name: '大有',
    englishName: 'Great Harvest',
    judgement: `In Ta Yu the weak line has the place of honor, is grandly central, and the strong lines above and below respond to it. Hence come its name of Ta Yu, having what is great. The attributes of its component trigrams are strength and vigor with elegance and brightness. The ruling line in it responds to the ruling line in the symbol of heaven, and consequently its action is all at the proper times. In this way it is said to indicate great progress and success. The trigram for heaven and that of fire above it form Ta Yu. The superior man, in accordance with this, represses what is evil and gives distinction to what is good, in sympathy with the excellent Heaven-conferred nature.`,  // Using template literals for multiline strings
  },
  '000100': {
    unicode: '䷎',
    number: '15',
    name: '謙',
    englishName: 'Humbleness',
    judgement: `Ch'ien indicates progress and success. It is the way of heaven to send down its beneficial influences below, where they are brilliantly displayed. It is the way of earth, lying low, to send its influences upwards and there to act. It is the way of Heaven to diminish the full and augment the humble. It is the way of earth to overthrow the full and replenish the humble. Spiritual Beings inflict calamity on the full and bless the humble. It is the way of men to hate the full and love the humble. Humility in a position of honor makes that still more brilliant; and in a low position men will not seek to pass beyond it. Thus it is that the superior man will have a good issue to his undertakings. The trigram for the earth and that of a mountain in the midst of it form Ch'ien. The superior man, in accordance with this, diminishes what is excessive in himself, and increases where there is any defect, bringing about an equality, according to the nature of the case, in his treatment of himself and others.`,  // Using template literals for multiline strings
  },
  '001000': {
    unicode: '䷏',
    number: '16',
    name: '豫',
    englishName: 'Delight',
    judgement: `In Yu we see the strong line responded to by all the others, and the will of him whom it represents being carried out; and also docile obedience employing movement for its purposes. From these things come Yu the Condition of harmony and satisfaction. In this condition we have docile obedience employing movement for its purposes, and therefore it is so as between heaven and earth; how much more will it be so among men in the setting up of feudal princes and putting the hosts in motion. Heaven and earth show that docile obedience in connection with movement and hence the sun and moon make no error in time, and the four seasons do not deviate from their order. The sages show such docile obedience in connection with their movements, and hence their punishments and penalties are entirely just, and the people acknowledge it by their submission. Great indeed are the time and significance indicated in Yu. The trigrams for the earth and thunder issuing from it with its crashing noise for Yu. The ancient kings, in accordance with this, composed their music and did honor to virtue, presenting it especially and most grandly to God, when they associated with him at the service their highest ancestor and their father.`,  // Using template literals for multiline strings
  },
  '011001': {
    unicode: '䷐',
    number: '17',
    name: '隨',
    englishName: 'Following',
    judgement: `In Sui, we see the strong trigram come and place itself under the weak; we see in the two the attributes of movement and pleasure: this gives the idea of Sui. There will be great progress and success; and through firm correctness no error: all under heaven will be found following at such a time. Great indeed are the time and significance indicated in Sui. The trigram for the waters of a marsh and that for thunder hidden in the midst of it form Sui. The superior man in accordance with this, when it is getting towards dark, enters his house and rests.`,  // Using template literals for multiline strings
  },
  '100110': {
    unicode: '䷑',
    number: '18',
    name: '蠱',
    englishName: 'Remedying',
    judgement: `In Ku we have the strong trigram above, and the weak one below; we have below pliancy, and above stopping: these give the idea of Ku, a troublous condition of affairs verging to ruin. Ku indicates great progress and success: through the course shown in it, all under heaven there will be good order. There will be advantage in crossing the great stream: he who advances will encounter the business to be done. He should weigh well, however, the events of three days before the turning point, and those to be done three days after it: the end of confusion is the beginning of order; such is the procedure of Heaven. The trigram for a mountain, and below it that for wind, form Ku. The superior man, in accordance with this, addresses himself to help the people and nourish his own virtue.`,  // Using template literals for multiline strings
  },
  '000011': {
    unicode: '䷒',
    number: '19',
    name: '臨',
    englishName: 'Approaching',
    judgement: `In Lin we see the strong lines gradually increasing and advancing. The lower trigram is the symbol of being pleased, and the upper of being compliant. The strong line is in the central position, and is properly responded to. There is great progress and success, along with firm correctness: this is the way of Heaven. In the eighth month there will be evil: the advancing power will decay after no long time. The trigram for the waters of a marsh and that for the earth above it form Lin. The superior man, in accordance with this, has his proposes of instruction that are inexhaustible, and nourishes and supports the people without limit.`,  // Using template literals for multiline strings
  },
  '110000': {
    unicode: '䷓',
    number: '20',
    name: '觀',
    englishName: 'Watching',
    judgement: `The great manifestor occupies an upper place in the figure, which consists of the trigrams whose attributes are docility and flexibility. He is in the central position and his correct place, and thus exhibits his lessons to all under Heaven. Kuan shows its subject like a worshipper who has washed his hands, but not yet presented his offerings; with sincerity and an appearance of dignity commanding reverent regard: all beneath look to him and are transformed. When we contemplate the spirit-like way of Heaven, we see how the four seasons proceed without error. The sages, in accordance with this spirit-like way, laid down their instructions, and all under heaven yield submission to them. The trigram representing the earth, and that for wind moving above it, form Kuan. The ancient Kings, in accordance with this examined the different regions of the kingdom, to see the ways of the people, and set forth their instructions.`,  // Using template literals for multiline strings
  },
  '101001': {
    unicode: '䷔',
    number: '21',
    name: '噬嗑',
    englishName: 'Eradicating',
    judgement: `The existence of something between the jaws gives rise to the name Shih Ho, union by means of biting through the intervening article. The Union by means of biting through the intervening article indicates the successful progress denoted by the hexagram. The strong and weak lines are equally divided in the figure. Movement is denoted by the lower trigram, and bright intelligence by the upper; thunder and lightning uniting in them, and having brilliant manifestation. The weak fifth line is in the center, and acts in its high position. Although it is not in its proper position, this is advantageous for the use of legal constraints. The trigrams representing thunder and lightning form Shih Ho. The ancient kings, in accordance with this framed their penalties with intelligence, and promulgated their laws.`,  // Using template literals for multiline strings
  },
  '100101': {
    unicode: '䷕',
    number: '22',
    name: '賁',
    englishName: 'Adorning',
    judgement: `When it is said that Pi indicates there should be free course in what it denotes. We see the weak line coming and ornamenting the strong lines of the lower trigram, and hence it is said that ornament should have free course. On the other hand, the strong line above ornaments the weak ones of the upper trigram, and hence it is said that there will be little advantage, if ornament be allowed to advance and take the lead. This is illustrated in the appearances that ornament the sky. Elegance and intelligence denoted by the lower trigram regulated by the arrest denoted by the upper suggest the observances that adorn human society. We look at the ornamental figures of the sky, and thereby ascertain the changes of the seasons. We look at the ornamental observances of society, and understand the processes of transformation are accomplished all under heaven. The trigram representing a mountain and that for fire under it form Pi. The superior man, in accordance with this, throws a brilliancy around his various processes of government, but does not dare in a similar way to decide cases of criminal litigation.`,  // Using template literals for multiline strings
  },
  '100000': {
    unicode: '䷖',
    number: '23',
    name: '剝',
    englishName: 'Falling Away',
    judgement: `Po denotes overthrowing or being overthrown. We see in the figure the weak lines threatening to change the last strong line into one of themselves. That it will not be advantageous to make a movement in any direction whatever appears from the fact that the small men are now growing and increasing. The superior man acts according to the exigency of the time, and stops all forward movement, looking at the significance of the process of decrease and increase, of fullness and the decadence, as seen in the movements of the heavenly bodies. The trigrams representing the earth, and above it that for a mountain which adheres to the earth, for Po. Superiors, in accordance with this seek to strengthen those below them, to secure the peace and stability of their own position.`,  // Using template literals for multiline strings
  },
  '000001': {
    unicode: '䷗',
    number: '24',
    name: '復',
    englishName: 'Turning Back',
    judgement: `Fu indicates the free course and progress of what it denotes: it is the coming back of what is intended by the undivided line. Its subject's actions show movement directed by accordance with natural order. Hence he finds no one to distress him in his exits and entrances, and friends come to him, and no error is committed. He will return and repeat his proper course; in seven days comes his return: such is the movement of the heavenly revolution. There will be advantage in whatever direction movement is made: the strong lines are growing and increasing. Do we not see in Fu the mind of heaven and earth. The trigram representing the earth and that for thunder in the midst of it form Fu. The ancient kings, in accordance with this, on the day of the winter solstice, shut the gates of the passes from one state to another, so that the traveling merchants could not then pursue their journeys, nor the princes go on with the inspection of their states.`,  // Using template literals for multiline strings
  },
  '111001': {
    unicode: '䷘',
    number: '25',
    name: '無妄',
    englishName: 'Without Falsehood',
    judgement: `In Wu Wang we have the strong first line come from the outer trigram, and become in the inner trigram lord of the whole figure; we have the attributes of motive power and strength; we have the strong line of the fifth place in the central position, and responded to by the weak second: there will be great progress proceeding from correctness; such is the appointment of Heaven. If its subject and his action be not correct, he will fall into errors, and it will not be advantageous for him to move in any direction: Whither can he who thinks he is free from all insincerity, and yet is as here described proceed? Can anything be done advantageously by him whom the will and appointment of Heaven do not help? The thunder rolls all under the sky, and to everything there is given its nature, free from all insincerity. The ancient kings, in accordance with this, made their regulations in complete accordance with the seasons, thereby nourishing all things.`,  // Using template literals for multiline strings
  },
  '100111': {
    unicode: '䷙',
    number: '26',
    name: '大畜',
    englishName: 'Great Accumulation',
    judgement: `In the trigrams composing Ta Ch'u we have the attributes of the greatest strength and substantial solidity, which emit a brilliant light; and indicate a daily renewal of his virtue by the subject of it. The strong line is in the highest place, and suggests the value set on talents and virtue; there is power in the upper trigram and to keep the strongest in restraint: all this shows the great correctness required in the hexagram. The good fortune attached to the subject's not seeking to enjoy his revenues in his own family shows how talents and virtue are nourished. It will be advantageous to cross the great stream: the fifth line, representing the ruler, is responded to by the second, the central line of Ch'ien, representing Heaven. The trigram representing a mountain, and in the midst of it that representing heaven, form Ta Ch'u. The superior man, in accordance with this, stores largely in his memory the words and deeds of former men, to subserve the accumulation of his virtue.`,  // Using template literals for multiline strings
  },
  '100001': {
    unicode: '䷚',
    number: '27',
    name: '頤',
    englishName: 'Nourishing',
    judgement: `I indicates that with firm correctness there will be good fortune: when the nourishing is correct, there will be good fortune. We must look at what we are seeking to nourish: we must look at those whom we wish to nourish. We must by the exercise of our thoughts seek the proper aliment: we must look to our own nourishing of ourselves. Heaven and earth nourish all things. The sages nourish men of talents and virtue, by them to reach to the myriads of the people. Great is the work intended by this nourishing in its time. The trigram representing a mountain and under it that for thunder form I. The superior man, in accordance with this enjoins watchfulness over our words, and the temperate regulation of our eating and drinking.`,  // Using template literals for multiline strings
  },
  '011110': {
    unicode: '䷛',
    number: '28',
    name: '大過',
    englishName: 'Great Exceeding',
    judgement: `Ta Kuo shows the great one (undivided lines) in excess. In the beam that is weak we see weakness both in the lowest and the topmost lines. The strong lines are in excess, but two of them are in the central positions. The action of the hexagram is represented by the symbols flexibility and satisfaction. Hence it is said, there will be advantage in moving in any direction whatever; yea, there will be success. The trigram representing trees hidden beneath that for the waters of a marsh for Ta Kuo. The superior man, in accordance with this, stands up alone and has no fear, and keeps retired from the world without regret.`,  // Using template literals for multiline strings
  },
  '010010': {
    unicode: '䷜',
    number: '29',
    name: '坎',
    englishName: 'Darkness',
    judgement: `K'an repeated shows us one defile succeeding another. This is the nature of water; it flows on, without accumulating its volume so as to overflow; it pursues its way through a dangerous defile, without losing its true nature. That the mind is penetrating is indicated by the strong line in the center. That action in accordance with this will be of high value tells us that advance will be followed by achievement. The dangerous height of heaven cannot be ascended; the difficult places of the earth are mountains, rivers, hills, and mounds. Kings and princes arrange, by means of such strengths, to maintain their territories. Great indeed is the use of what is here taught about seasons of peril. The representation of water flowing on continuously forms the repeated K'an. The superior man, in accordance with this, maintains constantly the virtue of his heart and the integrity of his conduct, and practices the business of instruction.`,  // Using template literals for multiline strings
  },
  '101101': {
    unicode: '䷝',
    number: '30',
    name: '離',
    englishName: 'Brightness',
    judgement: `Li means being attached to. The sun and moon have their place in the sky. All the grains, grass, and trees have their place on the earth. The double brightness of the two trigrams adheres to what is correct, and the result is the transforming and perfecting all under the sky. The weak second line occupies the middle and correct position, and gives the indication of a free and successful course; and, moreover, nourishing docility like that of the cow will lead to good fortune. The trigram for brightness, repeated, forms Li. The great man, in accordance with this, cultivates more and more his brilliant virtue, and diffuses its brightness over the four quarters of the land.`,  // Using template literals for multiline strings
  },
  '011100': {
    unicode: '䷞',
    number: '31',
    name: '咸',
    englishName: 'Mutual Influence',
    judgement: `Hsien is here used in the sense of Kên, meaning mutually influencing. The weak trigram above, and the strong one below; their two influences moving and responding to each other, and thereby forming a union; the repression of the one and the satisfaction of the other; with their relative position, where the male is placed below the female: all these things convey the notion of a free and successful course on the fulfillment of the conditions, while the advantage will depend on being firm and correct, as in marrying a young lady, and there will be good fortune. Heaven and earth exert their influences, and there ensue the transformation and production of all things. The sages influence the minds of men, and the result is harmony and peace all under the sky. If we look at the method and issues of those influences, the true character of heaven and earth and of all things can be seen. The trigram representing a mountain and above it that for the waters of a marsh for Hsien. The superior man, in accordance with this, keeps his mind free from pre-occupation, and open to receive the influences of others.`,  // Using template literals for multiline strings
  },
  '001110': {
    unicode: '䷟',
    number: '32',
    name: '恆',
    englishName: 'Long Lasting',
    judgement: `Hêng denotes long continuance. The strong trigram is above, and the weak one below; they are the symbols of thunder and wind, which are in mutual communication; they have the qualities of docility and motive force; their strong and weak lines all respond, each to the other: these things are all found in Hêng. When it is said that Hêng indicates successful progress and no error in what it denotes; but the advantage will come from being firm and correct, this indicates that there must be long continuance in its way of operation. The way of heaven and earth is to be long continued in their operation without stopping. When it is said that movement in any direction whatever will be advantageous, this implies that when the moving power is spent, it will begin again. The sun and moon, realizing in themselves the course of Heaven, can perpetuate their shining. The four seasons, by their changing and transforming, can perpetuate their production of things. The sages persevere long in their course, and all under the sky are transformed and perfect. When we look at what they continue doing long, the natural tendencies of heaven, earth, and all things can be seen. The trigram representing thunder and that for wind form Hêng. The superior man, in accordance with this, stands firm, and does not change his method of operation.`,  // Using template literals for multiline strings
  },
  '111100': {
    unicode: '䷠',
    number: '33',
    name: '遯',
    englishName: 'Retreat',
    judgement: `Tun indicates successful progress: that is, in the very retiring which Thun denotes there is such progress. The strong line is in the ruling place, the fifth, and is properly responded to by the second line. The action takes place according to the requirement of the time. To a small extent it will still be advantageous to be firm and correct: the small men are gradually encroaching and advancing.
Great indeed is the significance of what is required to be done in the time that necessitates retiring. The trigram representing the sky and below it that for a mountain form Tun. The superior man, in accordance with this, keeps small men at a distance, not by showing that he hates them, but by his own dignified gravity.`,  // Using template literals for multiline strings
  },
  '001111': {
    unicode: '䷡',
    number: '34',
    name: '大壯',
    englishName: 'Great Strength',
    judgement: `In Ta Chuang we see that which is great becoming strong. We have the trigram denoting strength directing that which denotes movement, and hence the whole is expressive of vigor. Ta Chuang indicates that it will be advantageous to firm and correct: that which is great should be correct. Given correctness and greatness in their highest degree, and the character and tendencies of heaven and earth can be seen. The trigram representing heaven and above it that for thunder form Ta Chuang. The superior man, in accordance with this, does not take a step which is not according to propriety.`,  // Using template literals for multiline strings
  },
  '101000': {
    unicode: '䷢',
    number: '35',
    name: '晉',
    englishName: 'Proceeding Forward',
    judgement: `In Chin we have the bright sun appearing above the earth; the symbol of docile submission cleaving to that of the Great brightness; and the weak line advanced and moving above: all these things give us the idea of a prince who secures the tranquillity of the people, presented on that account with numerous horses by the king, and three times in a day received at interviews. The trigram representing the earth and that for the bright sun coming forth above it for Chin. The superior man, according to this gives himself to make more brilliant his bright virtue.`,  // Using template literals for multiline strings
  },
  '000101': {
    unicode: '䷣',
    number: '36',
    name: '明夷',
    englishName: 'Brilliance Injured',
    judgement: `The symbol of the Earth and that of Brightness entering into the midst of it give the idea of Ming I, Brightness wounded or obscured. The inner trigram denotes being accomplished and bright; the outer, being pliant and submissive. The case of king Wan was that of one who with these qualities was yet involved in great difficulties. It will be advantageous to realize the difficulty of the position, and maintain firm correctness: that is , the individual concerned should obscure his brightness. The case of the count of Ki was that of one who, amidst the difficulties of his house was able thus to maintain his aim and mind correct. The trigram representing the earth and that for the bright sun entering within it form Ming I. The superior man, in accordance with this, conducts his management of men; he shows his intelligence by keeping it obscured.`,  // Using template literals for multiline strings
  },
  '110101': {
    unicode: '䷤',
    number: '37',
    name: '家人',
    englishName: 'Household',
    judgement: `In Chia Jên the wife has her correct place in the inner trigram, and the man his correct place in the outer. That man and woman occupy their correct places is the great righteousness shown in the relation and positions of heaven and earth. In Chia Jên we have the idea of an authoritative ruler; than, namely, represented by the parental authority. Let the father be indeed father, and the son son; let the elder brother be indeed elder brother, and the younger brother younger brother; let the husband be indeed husband, and the wife wife: then will the family be in its normal state. Bring the family to that state, and all under heaven will be established. The trigram representing fire, and that for wind coming forth from it, form Chia Jên. The superior man, in accordance with this, orders his words according to the truth of things, and his conduct so that it is uniformly consistent.`,  // Using template literals for multiline strings
  },
  '101011': {
    unicode: '䷥',
    number: '38',
    name: '睽',
    englishName: 'Diversity',
    judgement: `In K'uei we have the symbol of Fire, which, when moved, tends upwards, and that of a Marsh, whose waters, when moved, tend downwards. We have also the symbols of two sisters living together, but whose wills do not move in the same direction. We see how the inner trigram expressive of harmonious satisfaction is attached to the outer expressive of bright intelligence; we see the weak line advanced and acting above, and how it occupies the central place, and is responded to by the strong line below. These indications show that in small matters there will still be good fortune. Heaven and earth are separate and apart, but the work which they do is the same. Male and female are separate and apart, but with a common will they seek the same object. There is diversity between the myriad classes of beings, but there is an analogy between their several operations. Great indeed are the phenomena and the results of this condition of disunion and separation. The trigram representing fire above, and that for the waters of a marsh below, form K'uei. The superior man, in accordance with this, where there is a general agreement, yet admits diversity.`,  // Using template literals for multiline strings
  },
  '010100': {
    unicode: '䷦',
    number: '39',
    name: '蹇',
    englishName: 'Hardship',
    judgement: `Chien denotes difficulty. There is the trigram expressive of perilousness in front. When one, seeing the peril, can arrest his steps in accordance with the significance of the lower trigram, is he not wise. The language of Chien, that advantage and in the central place. That there will be no advantage in the northeast, intimates that the way of dealing with the Kien state is exhausted. That it will be advantageous to see the great man, intimates that advance will lead to achievement. That the places of the different lines after the first are those appropriate to them indicates firm correctness and good fortune, with which the regions of the kingdom are brought to their normal state. Great indeed is the work to be done in the time of Chien. The trigram representing a mountain, and above it that for water, from Chien. The superior man in accordance with this, turns round and examines himself, and cultivates his virtue. It will be advantageous to meet the great man: by his course he follows that noble lord of the figure.`,  // Using template literals for multiline strings
  },
  '001010': {
    unicode: '䷧',
    number: '40',
    name: '解',
    englishName: 'Relief',
    judgement: `In Hsieh we have the trigram expressive of peril going on to that expressive of movement. By movement there is an escape from the peril: this is the meaning of Hsieh. In the state indicated byHsieh, advantage will be found in the southwest: the movement thus intimated will win all. That there will be good fortune in coming back to the old conditions shows that such action is that of the due medium. That if some operations be necessary, there will be good fortune in the early conducting of them shows that such operations will be successful. When heaven and earth are freed from the grasp of winter, we have thunder and rain. When these come, the buds of the plants and trees that produce the various fruits begin to burst. Great indeed are the phenomena in the time intimated by Hsieh. The trigram representing thunder and that for rain, with these phenomena in a state of manifestation, form Hsieh. The superior man, in accordance with this, forgives errors, and deals gently with crimes.`,  // Using template literals for multiline strings
  },
  '110001': {
    unicode: '䷨',
    number: '41',
    name: '損',
    englishName: 'Decrease',
    judgement: `In Sun we see the lower trigram diminished, and the upper added to. But the method of action implied in this operates also above or, mounts upwards also and operates.
    If there be sincerity in this method of diminution, there will be great good fortune; freedom from error; firmness and correctness that can be maintained; and advantage in every movement that shall be made. In what shall this sincerity in the exercise of Sun be employed?
    Even in sacrifice, two baskets of grain, though there be nothing else, may be presented: for these two baskets there ought to be the fitting time.
    There is a time when the strong should be diminished, and the weak should be strengthened.
    Diminution and increase, overflowing and emptiness: these take place in harmony with the conditions of the time.
    `,  // Using template literals for multiline strings
  },
  '100011': {
    unicode: '䷩',
    number: '42',
    name: '益',
    englishName: 'Increase',
    judgement: `In I we see the upper trigram diminished, and the lower added to. The satisfaction of the people in consequence of this is without limit. What descends from above reaches to all below, so great and brilliant is the course of its operation.
    That there will be advantage in every movement which shall be undertaken appears from the central and correct positions of the second and fifth lines, and the general blessing the dispensing of which they imply.
    I is made up of the trigrams expressive of movement and docility, through which there is daily advancement to an unlimited extent. We have also in it heaven dispensing and earth producing, leading to an increase without restriction of place.
    Everything in the method of this increase proceeds according to the requirements of the time.
    `,  // Using template literals for multiline strings
  },
  '011000': {
    unicode: '䷪',
    number: '43',
    name: '夬',
    englishName: 'Breakthrough',
    judgement: `Kuai is the symbol of displacing or removing. We see in the figure the strong line displacing the weak. We have in it the attributes of strength and complacency. There is displacement, but harmony continues.
    The exhibition of the criminal's guilt in the royal courtyard is suggested by the one weak line mounted on the five strong lines.
    There is an earnest and sincere appeal for sympathy and support, and a consciousness of the peril involved in the undertaking: it is the realization of this danger, which makes the method of compassing the object brilliant.
    He should make an announcement in his own city, and show that it will not be well to have recourse at once to arms: if he have recourse to arms, what he prefers will soon be exhausted.
    There will be advantage in whatever he shall go forward to: when the growth of the strong lines has been completed, there will be an end of the displacement.
    `,  // Using template literals for multiline strings
  },
  '000110': {
    unicode: '䷫',
    number: '44',
    name: '姤',
    englishName: 'Encountering',
    judgement: `Kou has the significance of unexpectedly coming on. We see in it the weak line coming unexpectedly on the strong ones. It will not be good to marry such a female: one so symbolized should not be long associated with. Heaven and earth meeting together as here represented, all the variety of natural things become fully displayed. When a strong line finds itself in the central and correct position, good government will greatly prevail all under the sky. Great indeed is the significance of what has to be done at the time indicated by Kou. The trigram representing wind and that for the sky above it form Kou. The sovereign, in accordance with this, delivers his charges, and promulgates his announcements throughout the four quarters.`,  // Using template literals for multiline strings
  },
  '011101': {
    unicode: '䷬',
    number: '45',
    name: '萃',
    englishName: 'Gathering Together',
    judgement: `Ts'ui indicates the condition of union, or being collected.
    We have in it the symbol of docile obedience going on to what is expressed by that of satisfaction.
    There is the strong line in the central place, and rightly responded to.
    Hence comes the idea of union.
    `,  // Using template literals for multiline strings
  },
  '101110': {
    unicode: '䷭',
    number: '46',
    name: '升',
    englishName: 'Rising',
    judgement: `We find the weak line, as it finds the opportunity, ascending upwards.
    We have the attribute of flexibility and that of obedience; we have the strong line below and its proper correlate above: these things indicate that there will be great progress and success.
    Seeking by the qualities implied in Shêng to meet with the great man, its subject need have no anxiety: there will be ground for congratulation. Advance to the south will be fortunate: his aim will be carried out.
    `,  // Using template literals for multiline strings
  },
  '010110': {
    unicode: '䷮',
    number: '47',
    name: '困',
    englishName: 'Exhaustion',
    judgement: `In K'un we see the strong lines covered and obscured by the weak.
    We have in it the attribute of perilousness going on to that of satisfaction. Who is it but the superior man that, though straightened, still does not fail in making progress to his proper end.
    For the firm and correct, the really great man, there will be good fortune: this is shown by the central positions of the strong lines.
    If he make speeches, his words cannot be made good: to be fond of arguing or pleading is the way to be reduced to extremity.
    `,  // Using template literals for multiline strings
  },
  '011010': {
    unicode: '䷯',
    number: '48',
    name: '井',
    englishName: 'The Well',
    judgement: `We have the symbol of wood in the water and the raising of the water; which gives us the idea of a well. A well supplies nourishment and is not itself exhausted.
    The site of a town may be changed, while the fashion of its wells undergoes no change: this is indicated by the central position of the strong lines in the second and fifth places.
    The drawing is nearly accomplished, but the rope has not yet reached the water of the well: its service has not yet been accomplished. The bucket is broken: it is this that occasions evil.
    `,  // Using template literals for multiline strings
  },
  '011011': {
    unicode: '䷰',
    number: '49',
    name: '革',
    englishName: 'Revolution',
    judgement: `In Ko we see water and fire extinguishing each other; we see also two daughters dwelling together, but with their minds directed to different objects: on account of these things it is called the hexagram of change.
    It is believed in only after it has been accomplished: when the change has been made, faith is accorded to it.
    We have cultivated intelligence as the basis of pleased satisfaction, suggesting great progress and success, coming from what is correct.
    When change thus takes place in the proper way, occasion for repentance disappears.
    Heaven and earth undergo their changes, and the four seasons complete their functions. Thang changed the appointment of the line of Hsia to the throne, and Wu that of the line of Shang, in accordance with the will of Heaven, and in response to the wishes of men. Great indeed is what takes place in a time of change.
    `,  // Using template literals for multiline strings
  },
  '110110': {
    unicode: '䷱',
    number: '50',
    name: '鼎',
    englishName: 'The Cauldron',
    judgement: `In Ting we have symbolically the figure of a cauldron.
    We see the symbol of wood entering into that of fire, which suggests the idea of a cooking.
    The sages cooked their offerings in order to present them to God, and made great feasts to nourish their wise and able ministers.
    We have the symbol of flexible obedience, and that which denotes ears quick of hearing and eyes clear-sighted.
    We have also the weak line advanced and acting above, in the central place, and responded to by the strong line below. All these things give the idea of great progress and success.
    `,  // Using template literals for multiline strings
  },
  '100100': {
    unicode: '䷲',
    number: '51',
    name: '震',
    englishName: 'Thunder',
    judgement: `Chên gives the intimation of ease and development.
    When the time of movement which it indicates comes, its subject will be found looking out with apprehension: that feeling of dread leads to happiness. An yet smiling and talking cheerfully: the issue of his dread is that he adopts proper laws for his course.
    The movement like a crash of thunder terrifies all within a hundred li: it startles the distant and frightens the near.
    He will be like the sincere worshipper, who is not startled into letting go his ladle and cup of sacrificial spirits: he makes his appearance, and maintains his ancestral temple and the altars of the spirits of the land and grain, as presiding at all sacrifices.
    `,  // Using template literals for multiline strings
  },
  '001001': {
    unicode: '䷳',
    number: '52',
    name: '艮',
    englishName: 'Mountain',
    judgement: `Kên denotes stopping or resting: resting when it is the time to rest, and acting when it is the time to act.
    When one's movements and restings all take place at the proper time for them, his way of proceeding is brilliant and intelligent.
    Resting in one's resting-point is resting in one's proper place. The upper and lower lines of the hexagram exactly correspond to each other, but are without any interaction; hence it is said that the subject of the hexagram has no consciousness of self; that when he walks in his courtyard, he does not see any of the persons in it; and that there will be no error.
    
    `,  // Using template literals for multiline strings
  },
  '001011': {
    unicode: '䷴',
    number: '53',
    name: '漸',
    englishName: 'Gradual Progress',
    judgement: `The advance indicated by Chien is like the marrying of a young lady which is attended by good fortune.
    The lines as they advance get into their correct places: this indicates the achievements of a successful progress.
    Among the places of the hexagram we see the strong undivided line in the centre.
    In the attributes of restfulness and flexible penetration we have the assurance of an onward movement that is inexhaustible.
    `,  // Using template literals for multiline strings
  },
  '110100': {
    unicode: '䷵',
    number: '54',
    name: '歸妹',
    englishName: 'The Maiden',
    judgement: `By Kuei Mei, the marrying away of a younger sister, the great and righteous relation between heaven and earth is suggested to us.
    If heaven and earth were to have no intercommunication, things would not grow and flourish as they do. The marriage of a younger sister is the end of her maidenhood and the beginning of her motherhood.
    We have in the hexagram the desire of pleasure and, on the ground of that, movement following. The marrying away is of a younger sister.
    Any action will be evil: the places of the lines are not those appropriate to them. It will be in no wise advantageous: the weak third and fifth line are mounted on strong lines.
    `,  // Using template literals for multiline strings
  },
  '110010': {
    unicode: '䷶',
    number: '55',
    name: '豐',
    englishName: 'Abundance',
    judgement: `Fêng has the signification of being great. It is made up of the trigrams representing intelligence and movement directed by that intelligence. It is thus that it has that signification. The king has reached the condition denoted by Fêng: he has still to make it greater. There is no occasion to be anxious. Let him be as the sun at noon: It is for him to cause his light to shine on all under the sky. When the sun has reached the meridian height, it begins to decline. When the moon has become full, it begins to wane. The interaction of heaven and earth is now vigorous and abundant, now dull and scanty, growing and diminishing according to the seasons. How much more must it be so with the operations of men. How much more also with the spiritual agency. The trigrams representing thunder and lightning combine to form Fêng. The superior man, in accordance with this, decides cases of litigation, and apportions punishments with exactness.`,  // Using template literals for multiline strings
  },
  '010011': {
    unicode: '䷷',
    number: '56',
    name: '旅',
    englishName: 'The Wanderer',
    judgement: `Lu indicates that there may be some small attainment and progress: the weak line occupies the central place in the outer trigram, and is obedient to the strong lines on either side of it.
    We have also the attributes of quiet resting closely attached to intelligence in the component trigrams.
    Hence it is said, there may be some small attainment and progress. If the stranger or traveler be firm and correct as he ought to be, there will be good fortune.
    Great is the time and great is the right course to be taken as intimated in Lu.
    `,  // Using template literals for multiline strings
  },
  '011111': {
    unicode: '䷸',
    number: '57',
    name: '巽',
    englishName: 'Wind',
    judgement: `The double Sun shows how, in accordance with it, governmental orders are reiterated.
    We see that the strong fifth line has penetrated into the central and correct place, and the will of its subject is being carried into effect; we also see the weak first and fourth lines both obedient to the strong line above them.
    It is hence said, there will be some little attainment and progress. There will be advantage in movement onward in whatever direction.
    It will be advantageous also to see the great man.
    `,  // Using template literals for multiline strings
  },
  '111110': {
    unicode: '䷹',
    number: '58',
    name: '兌',
    englishName: 'Lake',
    judgement: `Tui has the meaning of pleased satisfaction. We have the strong lines in the center, and the weak lines on the outer edge of the two trigrams, indicating that in pleasure what is most advantageous is the maintenance of firm correctness.
    Through this there will be found an accordance with the will of heaven, and a correspondence with the feelings of men.
    When such pleasure goes before the people, and leads them on, they forget their toils; when it animates them in encountering difficulties, they forget the risk of death.
    How great is the power of this pleased satisfaction, stimulating in such a way the people.
    `,  // Using template literals for multiline strings
  },
  '001101': {
    unicode: '䷺',
    number: '59',
    name: '渙',
    englishName: 'Disintegration',
    judgement: `Huan intimates that there will be progress and success: we seethe strong line in the second place of the lower trigram, and not suffering any extinction there; and also the weak line occupying its place in the outer trigram, and uniting its action with that of the line above.
    The king goes to his ancestral temple: the king's mind is without any deflection.
    It will be advantageous to cross the great stream: the subject of the hexagram rides in a vessel of wood over water, and will do so with success.
    `,  // Using template literals for multiline strings
  },
  '101100': {
    unicode: '䷻',
    number: '60',
    name: '節',
    englishName: 'Limitation',
    judgement: `Chieh intimates progress and attainment: the strong and weak lines are equally divided, and the strong lines occupy the central places.
    If the regulations which Chieh prescribes be severe and difficult, they cannot be permanent: its course of action will in that case come to an end.
    We have the feeling of pleasure and satisfaction directing the course amidst peril.
    We have all regulations controlled by authority in its proper place.
    We have free action proceeding from the central and correct position.
    Heaven and earth observe their regular terms, and we have the four seasons complete.
    If rulers frame their measures according to the due regulations, the resources of the state suffer no injury, and the people receive no hurt.
    `,  // Using template literals for multiline strings
  },
  '110011': {
    unicode: '䷼',
    number: '61',
    name: '中孚',
    englishName: 'Sincerity',
    judgement: `In Chung Fu we have the two weak lines in the innermost part of the figure, and strong lines occupying the central places in the trigrams. We have the attributes of pleased satisfaction and flexible penetration.
    Sincerity this symbolled will transform a country.
    Pigs and fish are moved, and there will be good fortune: sincerity reaches to and affects even pigs and fishes.
    There will be advantage in crossing the great stream: we see in the figure one riding on the emblem of wood, which forms an empty boat.
    In the exercise of the virtue denoted by Chung Fu, it is said that there will be advantage in being firm and correct: in that virtue indeed we have the response of man to Heaven.
    `,  // Using template literals for multiline strings
  },
  '001100': {
    unicode: '䷽',
    number: '62',
    name: '小過',
    englishName: 'Small Exceeding',
    judgement: `In Hsiao Kuo we see the small lines exceeding the others, and giving the intimation of progress and attainment.
    Such exceeding, in order to its being advantageous, must be associated with firmness and correctness: that is, it must take place only according to the requirements of the time.
    The weak lines are in the central places, and hence it is said that what the name denotes may be done in small affairs, and there will be good fortune.
    Of the strong lines one is not in its proper place, and the other is not central, hence it is said that what the name denotes should not be done in great affairs.
    In the hexagram we have the symbol of a bird on the wing, and of the notes that come down from such a bird, for which it is better to descend than to ascend, thereby leading to great good fortune: to ascend is contrary to what is reasonable in the case, while to descend is natural and right.
    `,  // Using template literals for multiline strings
  },
  '010101': {
    unicode: '䷾',
    number: '63',
    name: '既濟',
    englishName: 'Already Fulfilled',
    judgement: `Chi Chi intimates progress and success: in small matters, that is, there will be that progress and success. There will be advantage in being firm and correct: the strong and weak lines are correctly arranged, each in its appropriate place. There has been good fortune in the beginning: the weak second line is in the center. In the end there is a cessation of effort, and disorder arises: the course that led to rule and order is now exhausted. The trigram representing fire and that for water above it for Ki Chi. The superior man, in accordance with this, thinks of evil that may come, and beforehand guards against it.`,  // Using template literals for multiline strings
  },
  '101010': {
    unicode: '䷿',
    number: '64',
    name: '未濟',
    englishName: 'Not Yet Fulfilled',
    judgement: `Wei Chi intimates progress and success in the circumstances which it implies: the weak fifth line is in the center. The young fox has nearly crossed the stream: but he has not yet escaped from the midst of the danger and calamity. Its tail gets immersed. There will be no advantage in any way: there is not at the end a continuance of the purpose at the beginning. Although the places of the different lines are not those appropriate to them, yet a strong line and a weak line always respond to each other. The trigram representing water and that for fire above it form Wei Chi. The superior man, in accordance with this, carefully discriminates among the qualities of things and the different positions they naturally occupy. Ref:Yi Chingtranslated byJames Legge(1815 –1897). Both the explanation of the Gua by King Wen and the explanation of the lines by the Duke of Kau were translated by James Legge.`,  // Using template literals for multiline strings
  },
};


const HexagramDisplay = ({ coinResults }) => {
  const calculateHexagrams = (coinResults) => {
    const coinValues = coinResults.map((result) => (result === 'heads' ? 2 : 3));
    const hexagramLines = [];
  
    for (let i = 0; i < 6; i++) {
      const lineTotal = coinValues.slice(i * 3, i * 3 + 3).reduce((a, b) => a + b, 0);
      const line = lineTotal % 2 === 0 ? '0' : '1';
      hexagramLines.push(line);
    }
  
    const binaryHexagram = hexagramLines.join('');
    const transformingHexagram = binaryHexagram.split('').map((bit) => (bit === '0' ? '1' : '0')).join('');
    
    // Calculate the transitioningLine
    let transitioningLine = 0;
    for (let i = 0; i < 6; i++) {
      if (hexagramLines[i] !== hexagramLines[0]) {
        transitioningLine = i + 1;
        break;
      }
    }
  
    return { binaryHexagram, transformingHexagram, transitioningLine };
  };
  const { binaryHexagram, transformingHexagram, transitioningLine } = calculateHexagrams(coinResults);

  const unicodeHexagram = hexagramDictionary[binaryHexagram];
  const unicodeTransforming = hexagramDictionary[transformingHexagram];

  const [fadeIn, setFadeIn] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState("");

  function Modal({ isVisible, content, onClose }) {
    if (!isVisible) return null;

    const handleSaveToJournal = () => {
      // Logic for saving to journal goes here
      console.log("Saved to Journal");
    };

    const handleReload = () => {
      window.location.reload();
  };

    const handleOverlayClick = (event) => {
      if (event.target.className === "modal-overlay") {
        onClose();
      }
    };

    return (
      <div className="modal-overlay" onClick={handleOverlayClick}>
        <div className="modal-content">
          {content}
        </div>
        <div className="modal-buttons">
            <button onClick={handleSaveToJournal}>Save to Journal</button>
            <button onClick={handleReload}>Reload</button>
        </div>
      </div>
    );
  }

  const handleHexagramClick = () => {
    setModalContent(`${unicodeHexagram.judgement}`);
    setModalVisible(true);
  };

  const handleTransitioningLineClick = () => {
    setModalContent("To influence the thighs, one follows with continual compliance to bring about good fortune. One carries out one’s commands; there is no mistake.")
//    setModalContent(`${transitioningLine}`);
    setModalVisible(true);
  };

  const handleTransformingHexagramClick = () => {
    setModalContent(`${unicodeTransforming.judgement}`);
    setModalVisible(true);
  };

  useEffect(() => {
    setTimeout(() => {
      setFadeIn(true);
    }, 100);
  }, []);
  
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      }}
    >

      <div style={{
        flex: 1,
        padding: '30px',
        fontSize: '35px',
        textAlign: 'center',
        filter: isHovered ? 'none' : 'blur(2px)',
        transition: 'filter 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleHexagramClick}>
        {unicodeHexagram.englishName}
      </div>

      <div style={{
        display: 'flex',
        fontSize: '35px',
        opacity: fadeIn ? 1 : 0,
        transition: 'opacity 1s ease',
      }}>

        <Modal isVisible={isModalVisible} content={modalContent} onClose={() => setModalVisible(false)} />

        <div style={{
          flex: 1,
          padding: '30px',
          fontSize: '35px',
          marginRight: '100px',
          fontFamily: 'ApercuPro-Regular',
          filter: isHovered ? 'none' : 'blur(2px)',
          transition: 'filter 0.3s ease',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleHexagramClick}>
          {unicodeHexagram.unicode}
        </div>
        
        <div style={{
          flex: 1,
          padding: '35px',
          fontSize: '35px',
  
          textAlign: 'center',
          filter: isHovered ? 'none' : 'blur(2px)',
          fontFamily: 'ApercuPro-Regular'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleTransitioningLineClick}>
          {transitioningLine}
        </div>

        <div style={{
          flex: 2,
          padding: '30px',
          fontSize: '35px',
          fontFamily: 'ApercuPro-Regular',
          marginLeft: '100px',
          filter: isHovered ? 'none' : 'blur(2px)',
          transition: 'filter 0.3s ease',
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={handleTransformingHexagramClick}>
          {unicodeTransforming.unicode}
        </div>

      </div>

      <div style={{
        flex: 1,
        padding: '30px',
        fontSize: '35px',
        fontFamily: 'ApercuPro-Regular',
        textAlign: 'center',
        filter: isHovered ? 'none' : 'blur(2px)',
        transition: 'filter 0.3s ease',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleTransformingHexagramClick}>
        {unicodeTransforming.englishName}
      </div>

    </div>
  );
};

const CoinToss = () => {
  const [coinResults, setCoinResults] = useState([]);

  useEffect(() => {
    const tossCoin = () => (Math.random() < 0.5 ? 'heads' : 'tails');

    const performTosses = () => {
      const tossResults = [];
      for (let i = 0; i < 18; i++) {
        tossResults.push(tossCoin());
      }
      setCoinResults(tossResults);
    };

    performTosses();
  }, []);

  return <HexagramDisplay coinResults={coinResults} />;
};

export default CoinToss;
