using FA22.P05.Web.Features.Authorization;
using FA22.P05.Web.Features.Listings;

namespace FA22.P05.Web.Features.Bids;

    public class Bid
    {
        public int Id { get; set; }
        public  User? User { get; set; }
        public int UserId { get; set; }
        public decimal BidAmount { get; set; }
        public  Listing? Listing { get; set; }
        public int ListingId { get; set; }
    }
    public class BidDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }   
        public decimal BidAmount { get; set; }

        public int ListingId { get; set; }
    }

