
using FA22.P05.Web.Data;
using FA22.P05.Web.Features.Bids;
using FA22.P05.Web.Features.Items;
using FA22.P05.Web.Features.Listings;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FA22.P05.Web.Controllers
{
    [Route("api/bids")]
    [ApiController]
    public class BidsController : ControllerBase
    {
        private readonly DbSet<Bid> bids;
        private readonly DataContext dataContext;
        private readonly DbSet<Listing> listings;

        public BidsController(DataContext dataContext)
        {
            dataContext = dataContext;
            bids = dataContext.Set<Bid>();
            listings = dataContext.Set<Listing>();
        }


        [HttpPost]
       
        public ActionResult<BidDto> CreateBid(BidDto bidDto)
        {
            if (IsInvalid(bidDto)){
                    return BadRequest();
                 }

            var bid = new Bid
            {
                ListingId = bidDto.ListingId,
                BidAmount = bidDto.BidAmount,
            };

            bids.Add(bid);

            dataContext.SaveChanges();

            bidDto.Id = bid.Id;

            return Ok(bidDto);
        }


        private static bool IsInvalid(BidDto dto)
        {
            return ((dto.BidAmount <= 0) || (dto.UserId <= 0 ) || (dto.ListingId <= 0));
        }

    }


}
