
using FA22.P05.Web.Data;
using FA22.P05.Web.Extensions;
using FA22.P05.Web.Features.Authorization;
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

        [HttpGet]
        [Authorize]
        [Route("{id}")]
        public ActionResult<BidDto> GetBidById(int id)
        {
            var result = GetBidDtos(bids.Where(x => x.Id == id)).FirstOrDefault();
            if(result == null)
            {
                return BadRequest();
            }

            return Ok(result);
        }
    

        [HttpPost]
        [Authorize]
        public  ActionResult<BidDto> CreateBid(BidDto bidDto)
        {
           

            if (IsInvalid(bidDto)){
                    return BadRequest();
                 }

            var listing = listings.FirstOrDefault(x => x.Id == bidDto.ListingId);

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

            dataContext.SaveChanges();


            bidDto.Id = bid.Id;
           

            return Ok(bidDto);
        }
        [HttpDelete]
        [Route("{id}")]
        [Authorize]
        public ActionResult<BidDto> DeleteBid(int id)
        {
            var bid = bids.FirstOrDefault(x => x.Id == id);
            if(bid == null)
            {
                return NotFound();
            }

            if (!User.IsInRole(RoleNames.Admin) && bid.UserId != User.GetCurrentUserId())
            {
                return Forbid();
            }

            bids.Remove(bid);

            dataContext.SaveChanges();

            return Ok();
        }


        private static bool IsInvalid(BidDto dto)
        {
            return ((dto.BidAmount <= 0) || (dto.UserId <= 0 ) || (dto.ListingId <= 0));
        }
        public static IQueryable<BidDto> GetBidDtos(IQueryable<Bid> bids)
        {
            return bids
                .Select(x => new BidDto
                {
                    Id = x.Id,
                    BidAmount = x.BidAmount,
                    UserId = x.UserId,
                    ListingId = x.Listing!.Id,
                });
        }

    }


}
