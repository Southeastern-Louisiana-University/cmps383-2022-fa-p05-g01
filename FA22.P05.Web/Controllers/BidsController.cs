
using FA22.P05.Web.Data;
using FA22.P05.Web.Extensions;
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
            this.dataContext = dataContext;
            bids = dataContext.Set<Bid>();
            listings = dataContext.Set<Listing>();
        }


        [HttpPost]
        [Authorize]
        public ActionResult<BidDto> CreateBid(BidDto bidDto)
        {
            if (IsInvalid(bidDto)){
                    return BadRequest();
                 }

            var listing = listings.FirstAsync(x => x.Id == bidDto.ListingId);

            if(listing == null)
            {
                return BadRequest();
            }

            var bid = new Bid
            {

                BidAmount = bidDto.BidAmount,
                ListingId = listing.Id,
                UserId = User.GetCurrentUserId() ?? throw new Exception("missing user id")
            };

            bids.Add(bid);

            dataContext.SaveChangesAsync();

            bidDto.Id = listing.Id;
           

            return Ok(bidDto);
        }


        private static bool IsInvalid(BidDto dto)
        {
            return ((dto.BidAmount <= 0) || (dto.UserId <= 0 ) || (dto.ListingId <= 0));
        }

    }


}
