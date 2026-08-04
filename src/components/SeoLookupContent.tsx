export function SeoLookupContent() {
  return (
    <div className="mt-20 max-w-4xl mx-auto bg-white border border-slate-200 rounded-[40px] p-8 sm:p-12 mb-12">
      <h2 className="text-3xl font-black text-foreground mb-6 tracking-tight">Look up IP Address Location</h2>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        If you can find out the IPv4 or IPv6 address of an Internet user, you can get an idea what part of the country or world they're in by using our IP Lookup tool. What to do: Enter the IP address you're curious about in the box above, then click "Lookup".
      </p>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">How to get someone's IP address</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        Once you have an IP address it is as easy as pasting and clicking above. Your IP address is included in the "request transactions" when you send someone an email or visit a website. It's how you communicate and how you tell the website how to send information back to you.
      </p>

      <div className="grid sm:grid-cols-2 gap-8 mb-8">
        <div>
          <h4 className="text-xl font-bold text-emerald-600 mb-3">What you will get with this tool</h4>
          <ul className="list-disc pl-5 text-secondary-foreground space-y-2">
            <li>The ISP and organization's name</li>
            <li>The IP's host name</li>
            <li>The country it's in</li>
            <li>The region/state and city</li>
            <li>The latitude and longitude of the location (a best guess)</li>
            <li>The area code for that region</li>
            <li>Any known services running on that IP</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xl font-bold text-rose-600 mb-3">What you won't get</h4>
          <p className="text-secondary-foreground mb-3">You won't get anything like...</p>
          <ul className="list-disc pl-5 text-secondary-foreground space-y-2">
            <li>A person's name</li>
            <li>The exact location or street address</li>
            <li>A phone number</li>
            <li>Their email address</li>
          </ul>
          <p className="text-sm text-secondary-foreground mt-3 italic">
            That's where privacy issues come in, which are there to protect Internet users like you.
          </p>
        </div>
      </div>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">A word about accuracy</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        In countries outside the US and Europe the accuracy for the city level 25mile/40km radius is around 55%. Generally, you can expect ~99% accuracy at the country level, ~90% at the state/region level, and ~81% at the city level within a 25-mile radius.
      </p>

      <h3 className="text-2xl font-bold text-foreground mt-8 mb-4">More facts and details about looking up IP addresses</h3>
      <p className="text-secondary-foreground leading-relaxed mb-6">
        Pretty much all that anyone cares about when we go on the Internet is that our connection works. We leave all the connectivity issues to people who know what they’re doing. Still, a little knowledge can go a long way. You don’t have to be a computer science major to grasp some of the issues involved with how you connect to the internet.
      </p>
      
      <p className="text-secondary-foreground leading-relaxed mb-6">
        The IP Lookup page and tool provides the same information about an IP address that you can find about your own IP address. It’s what you see at the top of this page, and the Show Complete IP Details page as well, when you click on the link.
      </p>
      
      <p className="text-secondary-foreground leading-relaxed mb-6">
        Anyone on the internet, from companies you do business with to friends and family you email with, can see your IP Address and lookup details on it. Companies can get a profile of where their online customers or prospects are coming from, based on the number of “business or business inquiries coming” from IP addresses from a certain region. That type of easy-to-gain and legal data could be valuable to them for marketing or product development purposes.
      </p>
    </div>
  );
}
