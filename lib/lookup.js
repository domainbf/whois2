 const tlds = require('./local-tlds');
const whoisRaw = require('whois-raw');
const moment = require('moment');
const { decode } = require('html-entities');
const punycode = require('punycode');


const tldRegex = {
    'com': {
      domainName: /Domain Name:\s?(.+)/i,
      isAvailable: /No match for domain "(.+)"./i,
      updatedDate: /Updated Date:\s?(.+)/i,
      creationDate: /Creation Date:\s?(.+)/i,
      expirationDate: /Registry Expiry Date:\s?(.+)/i,
      registrar: /Registrar:\s?(.+)/i,
      nameServers: /Name Server:\s?(.+)/ig,
      status: /Status:\s?(.+)/ig
    },
    'net': {
      domainName: /Domain Name:\s?(.+)/i,
      isAvailable: /No match for domain "(.+)"./i,
      updatedDate: /Updated Date:\s?(.+)/i,
      creationDate: /Creation Date:\s?(.+)/i,
      expirationDate: /Registry Expiry Date:\s?(.+)/i,
      registrar: /Registrar:\s?(.+)/i,
      nameServers: /Name Server:\s?(.+)/ig,
        status: /Status:\s?(.+)/ig
    },
    'org': {
      domainName: /Domain Name:\s?(.+)/i,
      isAvailable: /NOT FOUND/i,
       updatedDate: /Updated Date:\s?(.+)/i,
      creationDate: /Creation Date:\s?(.+)/i,
      expirationDate: /Registry Expiry Date:\s?(.+)/i,
      registrar: /Registrar:\s?(.+)/i,
      nameServers: /Name Server:\s?(.+)/ig,
      status: /Domain Status:\s?(.+)/ig
    },
   'uk': {
      domainName: /Domain name:\s?(.+)/i,
      isAvailable: /No match for "(.+)"/i,
       updatedDate: /Last updated:\s?(.+)/i,
      creationDate: /Registered on:\s?(.+)/i,
      expirationDate: /Expiry date:\s?(.+)/i,
      registrar: /Registrar:\s?(.+)/i,
      nameServers: /Name servers:\s?(.+)/ig,
        status: /Domain status:\s?(.+)/ig

    },
    'de': {
      domainName: /Domain:\s?(.+)/i,
      isAvailable: /% (No entries found|Not found)/i,
      updatedDate: /Changed:\s?(.+)/i,
      creationDate: /Created:\s?(.+)/i,
      expirationDate: /Date of expiry:\s?(.+)/i,
      registrar: /Registrar:\s?(.+)/i,
      nameServers: /Nserver:\s?(.+)/ig,
      status: /Status:\s?(.+)/ig
    },
   'cn': {
        domainName: /Domain Name:\s?(.+)/i,
        isAvailable: /no matching record./i,
        updatedDate: /Updated Date:\s?(.+)/i,
        creationDate: /Registration Date:\s?(.+)/i,
        expirationDate: /Expiration Date:\s?(.+)/i,
        registrar: /Sponsoring Registrar:\s?(.+)/i,
        nameServers: /Name Server:\s?(.+)/ig,
        status: /Domain Status:\s?(.+)/ig
    },
    'ru': {
        domainName: /domain:\s?(.+)/i,
        isAvailable: /No entries found for the selected source./i,
        updatedDate: /modified:\s?(.+)/i,
        creationDate: /created:\s?(.+)/i,
         expirationDate: /paid-till:\s?(.+)/i,
        registrar: /registrar:\s?(.+)/i,
        nameServers: /nserver:\s?(.+)/ig,
        status: /state:\s?(.+)/ig
    },
    'ca': {
       domainName: /Domain name:\s?(.+)/i,
        isAvailable: /AVAILABILITY STATUS:\s(.+)/i,
        updatedDate: /Updated Date:\s?(.+)/i,
        creationDate: /Creation Date:\s?(.+)/i,
        expirationDate: /Expiry Date:\s?(.+)/i,
        registrar: /Registrar:\s?(.+)/i,
        nameServers: /Name servers:\s?(.+)/ig,
        status: /Status:\s?(.+)/ig
    },
    'jp':{
        domainName: /\[Domain Name]\s?(.+)/i,
         isAvailable: /No match for "(.+)"/i,
       updatedDate: /Last Updated:\s?(.+)/i,
        creationDate: /Created on:\s?(.+)/i,
         expirationDate: /Expires on:\s?(.+)/i,
         registrar: /\[Registrar]\s?(.+)/i,
        nameServers: /\[Name Server]\s?(.+)/ig,
       status: /\[Status]\s?(.+)/ig
    }
  };


async function lookup(domain, options = {}) {
  const domainName = punycode.toASCII(domain);
  const domainParts = domain.split('.');
  const tld = domainParts[domainParts.length - 1];
   const server = tlds[tld];

  if (!server) {
    return Promise.reject(new Error(`Unsupported TLD: ${tld}`));
   }

const regex = tldRegex[tld];
   if (!regex) {
      return { domainName: domain, isAvailable: null, raw: null };
    }

  try {
      const raw = await whoisRaw.lookup(domainName, options);
        const result = { domainName: domain, raw: raw};

        const isAvailableMatch = raw.match(regex.isAvailable);
         if (isAvailableMatch) {
            result.isAvailable = true;
            return result;
        }else{
            result.isAvailable = false;
        }

        const updatedDateMatch = raw.match(regex.updatedDate);
        if (updatedDateMatch) {
              result.updatedDate =  moment(updatedDateMatch[1].trim()).toISOString()
          }

        const creationDateMatch = raw.match(regex.creationDate);
         if(creationDateMatch){
            result.creationDate =  moment(creationDateMatch[1].trim()).toISOString()
        }

        const expirationDateMatch = raw.match(regex.expirationDate);
        if(expirationDateMatch){
            result.expirationDate = moment(expirationDateMatch[1].trim()).toISOString();
        }

        const registrarMatch = raw.match(regex.registrar);
        if(registrarMatch){
            result.registrar = decode(registrarMatch[1].trim());
        }

        const nameServers = [];
        let nameServerMatch;
        while ((nameServerMatch = regex.nameServers.exec(raw)) !== null) {
            nameServers.push(nameServerMatch[1].trim());
        }
        result.nameServers = nameServers;

         const status = [];
        let statusMatch;
        while ((statusMatch = regex.status.exec(raw)) !== null) {
           status.push(statusMatch[1].trim());
        }
        result.status = status;


        return result;
  } catch (error) {
      return { domainName: domain, isAvailable: null, raw: null, error: error.message };
    }
}

module.exports = lookup;
