class RoomsController < ApplicationController
    def index
        @rooms = Room.all
        @room_form = Room.new
    end

    def show
        @rooms = Room.all
        @room = Room.find(params[:id])
        @room_form = Room.new
    end

    def create
        @room = Room.new(room_params)

        if @room.save
            redirect_to "/"
        else
            render :new, status: :unprocessable_entity
        end
    end

    private
        def room_params
            params.require(:room).permit(:name)
        end
end
